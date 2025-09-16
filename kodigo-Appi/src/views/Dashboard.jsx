import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'

function BootcampRow({ item, onEdit, onDelete }){
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:8}}>
        <div>
          <h3 style={{marginBottom:4}}>{item.name}</h3>
          <p className="small" style={{margin:0}}>{item.description}</p>
          {Array.isArray(item.technologies) && <p className="small"><b>Tecnologías:</b> {item.technologies.join(', ')}</p>}
          {item.active === false && <span className="badge">Desactivado</span>}
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn secondary" onClick={()=> onEdit(item)}>Editar</button>
          <button className="btn" onClick={()=> onDelete(item)}>{item.active === false ? 'Desactivado' : 'Desactivar'}</button>
        </div>
      </div>
      <details className="small"><summary>JSON</summary><pre style={{whiteSpace:'pre-wrap', margin:0}}>{JSON.stringify(item, null, 2)}</pre></details>
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
    await api.post('/auth/bootcamps/create', payload)
    reset()
    onCreated?.()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{display:'grid', gap:12}}>
      <h3>Agregar bootcamp</h3>
      <div>
        <label>Nombre</label>
        <input className="input" {...register('name', { required:true })} placeholder="Full Stack Junior" />
      </div>
      <div>
        <label>Descripción</label>
        <input className="input" {...register('description', { required:true })} placeholder="Programa intensivo..." />
      </div>
      <div>
        <label>Tecnologías (separadas por coma)</label>
        <input className="input" {...register('technologies')} placeholder="HTML, CSS, JS, React, Node" />
      </div>
      <button className="btn" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Crear'}</button>
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
  useEffect(()=>{ reset({
    name: current?.name || '',
    description: current?.description || '',
    technologies: Array.isArray(current?.technologies) ? current.technologies.join(', ') : ''
  })}, [current, reset])

  const onSubmit = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      technologies: values.technologies ? values.technologies.split(',').map(s=>s.trim()).filter(Boolean) : []
    }
    await api.put(`/auth/bootcamps/update/${current._id || current.id}`, payload)
    onSaved?.()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card" style={{display:'grid', gap:12}}>
      <h3>Editar bootcamp</h3>
      <div>
        <label>Nombre</label>
        <input className="input" {...register('name', { required:true })} />
      </div>
      <div>
        <label>Descripción</label>
        <input className="input" {...register('description', { required:true })} />
      </div>
      <div>
        <label>Tecnologías (separadas por coma)</label>
        <input className="input" {...register('technologies')} />
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar cambios'}</button>
        <button className="btn secondary" type="button" onClick={onCancel}>Cancelar</button>
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
      const { data } = await api.get('/auth/bootcamps/all')
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
    await api.delete(`/auth/bootcamps/delete/${item._id || item.id}`)
    await load()
  }

  return (
    <div className="container">
      <h2>Dashboard de Bootcamps (Privado)</h2>
      {error && <div className="alert">{error}</div>}
      <div className="grid">
        <div>
          <CreateForm onCreated={load} />
          {editing && <EditForm current={editing} onCancel={()=>setEditing(null)} onSaved={()=>{ setEditing(null); load() }} />}
        </div>
        <div style={{display:'grid', gap:12}}>
          {loading && <div className="alert">Cargando...</div>}
          {!loading && bootcamps.map((b, idx)=>(
            <BootcampRow key={b._id || idx} item={b} onEdit={setEditing} onDelete={handleDelete} />
          ))}
          {!loading && !bootcamps.length && <p className="small">No hay bootcamps para mostrar.</p>}
        </div>
      </div>
    </div>
  )
}
