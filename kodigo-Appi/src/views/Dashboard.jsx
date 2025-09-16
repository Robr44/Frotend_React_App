import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'

function BootcampRow({ item, onEdit, onDelete }){
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title">{item.name} {item.active === false && <span className="badge bg-secondary">Desactivado</span>}</h5>
          <p className="card-text">{item.description}</p>
          {Array.isArray(item.technologies) && <p className="card-text"><small className="text-muted">Tecnologías: {item.technologies.join(', ')}</small></p>}
        </div>
        <div className="d-flex flex-column gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={()=> onEdit(item)}>Editar</button>
          <button className="btn btn-outline-danger btn-sm" onClick={()=> onDelete(item)}>{item.active === false ? 'Desactivado' : 'Desactivar'}</button>
        </div>
      </div>
    </div>
  )
}

function CreateForm({ onCreated }){
  const { register, handleSubmit, reset, formState:{ isSubmitting } } = useForm()
  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      technologies: values.technologies ? values.technologies.split(',').map(s=>s.trim()).filter(Boolean) : []
    }
    await api.post('/bootcamps/create', payload)
    reset()
    onCreated?.()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-3 mb-4 shadow-sm">
      <h5>Agregar Bootcamp</h5>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input className="form-control" {...register('name', { required:true })} placeholder="Full Stack Junior" />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input className="form-control" {...register('description', { required:true })} placeholder="Programa intensivo..." />
      </div>
      <div className="mb-3">
        <label className="form-label">Tecnologías (separadas por coma)</label>
        <input className="form-control" {...register('technologies')} placeholder="HTML, CSS, JS, React, Node" />
      </div>
      <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Crear'}</button>
    </form>
  )
}

function EditForm({ current, onCancel, onSaved }){
  const { register, handleSubmit, reset, formState:{ isSubmitting } } = useForm({
    defaultValues: useMemo(()=> ({
      name: current?.name || '',
      description: current?.description || '',
      technologies: Array.isArray(current?.technologies) ? current.technologies.join(', ') : ''
    }), [current])
  })
  useEffect(()=>{ 
    reset({
      name: current?.name || '',
      description: current?.description || '',
      technologies: Array.isArray(current?.technologies) ? current.technologies.join(', ') : ''
    })
  }, [current, reset])

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      technologies: values.technologies ? values.technologies.split(',').map(s=>s.trim()).filter(Boolean) : []
    }
    await api.put(`/bootcamps/update/${current._id || current.id}`, payload)
    onSaved?.()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-3 mb-4 shadow-sm">
      <h5>Editar Bootcamp</h5>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input className="form-control" {...register('name', { required:true })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input className="form-control" {...register('description', { required:true })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Tecnologías (separadas por coma)</label>
        <input className="form-control" {...register('technologies')} />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar cambios'}</button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}

export function Dashboard(){
  const [bootcamps, setBootcamps] = useState([])
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true); setError(null)
    try{
      const { data } = await api.get('/bootcamps/all')
      setBootcamps(Array.isArray(data) ? data : (data?.bootcamps || []))
    }catch(e){
      setError(e?.response?.data?.message || e.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  const handleDelete = async (item) => {
    if (!confirm(`¿Desactivar "${item.name}"?`)) return
    await api.delete(`/bootcamps/delete/${item._id || item.id}`)
    await load()
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard de Bootcamps (Privado)</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-lg-4">
          <CreateForm onCreated={load} />
          {editing && <EditForm current={editing} onCancel={()=>setEditing(null)} onSaved={()=>{ setEditing(null); load() }} />}
        </div>
        <div className="col-lg-8">
          {loading && <div className="alert alert-info">Cargando...</div>}
          {!loading && bootcamps.length === 0 && <p className="text-muted">No hay bootcamps para mostrar.</p>}
          {bootcamps.map((b, idx)=>(
            <BootcampRow key={b._id || idx} item={b} onEdit={setEditing} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}
