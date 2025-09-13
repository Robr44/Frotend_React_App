import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export const LandingPage = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchBootcamps(token);
  }, []);

  const fetchBootcamps = async (token) => {
    try {
      setLoading(true);
      let response;
      
      if (token) {
        response = await api.get('/bootcamps/all');
        
      } else {
        // Para usuarios no autenticados, usa datos de ejemplo
        response = { data: [
          {
            id: 1,
            name: "Java Developer",
            description: "Aprende Java desde cero hasta un nivel avanzado, incluyendo el desarrollo de aplicaciones backend robustas.",
            technologies: ["Java", "Spring Boot", "MySQL"],
            active: true
          },
          {
            id: 2,
            name: "Fullstack Jr",
            description: "Curso orientado a aprender desarrollo Fullstack con ReactJS, Laravel y MySQL.",
            technologies: ["ReactJS", "Laravel", "MySQL"],
            active: true
          },
          {
            id: 3,
            name: "Data Analytics",
            description: "Curso de análisis de datos con enfoque en Python, PowerBI y R para generar insights y visualización de datos.",
            technologies: ["Python", "PowerBI", "R"],
            active: true
          }
        ]};
      }
      
      setBootcamps(response.data);
      setError('');
    } catch (err) {
      console.error('Error loading bootcamps:', err);
      setError('No se pudieron cargar los bootcamps. Mostrando información de ejemplo.');
      // Datos de ejemplo en caso de error
      setBootcamps([
        {
          id: 1,
          name: "Java Developer",
          description: "Aprende Java desde cero hasta un nivel avanzado.",
          technologies: ["Java", "Spring Boot", "MySQL"],
          active: true
        },
        {
          id: 2,
          name: "Fullstack Jr",
          description: "Curso orientado a aprender desarrollo Fullstack.",
          technologies: ["ReactJS", "Laravel", "MySQL"],
          active: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Transforma tu carrera en tecnología
              </h1>
              <p className="lead mb-4" style={{color: 'var(--color-secondary)'}}>
                Bootcamps intensivos para convertirte en desarrollador profesional. 
                Aprende las tecnologías más demandadas con expertos de la industria.
              </p>
              <div className="d-flex flex-wrap gap-3 hero-buttons">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg px-4 py-2">
                      Comienza ahora
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg px-4 py-2">
                      Iniciar sesión
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary btn-lg px-4 py-2">
                    Ir al Dashboard
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Persona programando" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamps Section */}
      <section className="py-5" style={{backgroundColor: 'var(--color-letra)'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Nuestros Bootcamps</h2>
            <p className="lead" style={{color: 'var(--color-secondary)'}}>Programas intensivos diseñados para impulsar tu carrera tech</p>
          </div>
          
          {error && (
            <div className="alert alert-warning text-center" role="alert">
              {error}
            </div>
          )}
          
          <div className="row g-4">
            {bootcamps.filter(bootcamp => bootcamp.active).map(bootcamp => (
              <div key={bootcamp.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm bootcamp-card">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h3 className="h5 card-title text-primary">{bootcamp.name}</h3>
                      <span className="badge" style={{backgroundColor: 'var(--color-button)', color: 'white'}}>Disponible</span>
                    </div>
                    <p className="card-text" style={{color: 'var(--color-secondary)'}}>{bootcamp.description}</p>
                    <div className="mt-4">
                      <h6 className="mb-2" style={{color: 'var(--color-primary)'}}>Tecnologías:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {bootcamp.technologies.map((tech, index) => (
                          <span key={index} className="badge bg-secondary">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 pb-4 px-4">
                    {!isAuthenticated ? (
                      <Link to="/register" className="btn btn-outline-primary w-100">
                        Más información
                      </Link>
                    ) : (
                      <Link to="/dashboard" className="btn btn-primary w-100">
                        Ver en dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">¿Por qué elegirnos?</h2>
            <p className="lead" style={{color: 'var(--color-secondary)'}}>Ventajas de aprender con nuestros bootcamps</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-4 h-100 feature-card">
                <div className="feature-icon rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white'}}>
                  <i className="bi bi-speedometer2 fs-2"></i>
                </div>
                <h4 className="h5 mb-3 text-primary">Aprendizaje intensivo</h4>
                <p className="text-muted">Programas concentrados que te llevan de principiante a profesional en pocos meses.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4 h-100 feature-card">
                <div className="feature-icon rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white'}}>
                  <i className="bi bi-people-fill fs-2"></i>
                </div>
                <h4 className="h5 mb-3 text-primary">Instructores expertos</h4>
                <p className="text-muted">Aprende de profesionales con experiencia real en la industria tecnológica.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4 h-100 feature-card">
                <div className="feature-icon rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white'}}>
                  <i className="bi bi-briefcase-fill fs-2"></i>
                </div>
                <h4 className="h5 mb-3 text-primary">Enfoque laboral</h4>
                <p className="text-muted">Preparación específica para los requisitos actuales del mercado laboral tech.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">¿Listo para transformar tu carrera?</h2>
              <p className="lead mb-4">Únete a cientos de estudiantes que ya comenzaron su journey en tecnología</p>
              {!isAuthenticated ? (
                <Link to="/register" className="btn btn-light btn-lg px-5" style={{color: 'var(--color-primary)'}}>
                  Comienza ahora
                </Link>
              ) : (
                <Link to="/dashboard" className="btn btn-light btn-lg px-5" style={{color: 'var(--color-primary)'}}>
                  Explorar bootcamps
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};