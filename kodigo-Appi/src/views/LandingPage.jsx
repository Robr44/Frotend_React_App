import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export const LandingPage = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchBootcamps(token);
    
    // Configurar rotación automática de testimonios
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  // Datos de imágenes para cada bootcamp
  const bootcampImages = {
    1: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    2: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    3: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  };

  // Datos de testimonios
  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Desarrolladora Java",
      text: "El bootcamp de Java transformó mi carrera. En 6 meses pasé de no saber programar a trabajar en una empresa tecnológica.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Desarrollador Fullstack",
      text: "Increíble experiencia de aprendizaje. Los instructores son expertos de la industria y el plan de estudios está muy bien estructurado.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Analista de Datos",
      text: "El bootcamp de Data Analytics me dio las herramientas necesarias para cambiar mi carrera. Ahora trabajo en una empresa de análisis financiero.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

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
      <div className="landing-page">
        <div className="container py-5">
          <div className="row">
            {[1, 2, 3].map(item => (
              <div key={item} className="col-md-6 col-lg-4 mb-4">
                <div className="card loading-card" style={{backgroundColor: '#f0f0f0'}}></div>
              </div>
            ))}
          </div>
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
            <div className="col-lg-6 animate-fade-in-up">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Transforma tu carrera en <span className="text-secondary">tecnología</span>
              </h1>
              <p className="lead mb-4" style={{color: 'var(--color-secondary)'}}>
                Bootcamps intensivos para convertirte en desarrollador profesional. 
                Aprende las tecnologías más demandadas con expertos de la industria.
              </p>
              <div className="d-flex flex-wrap gap-3 hero-buttons">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg px-4 py-2 animate-fade-in delay-1">
                      Comienza ahora
                    </Link>
                    <Link to="/login" className="btn btn-outline-primary btn-lg px-4 py-2 animate-fade-in delay-2">
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
            <div className="col-lg-6 text-center animate-fade-in-up delay-1">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Persona programando" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', transform: 'rotate(3deg)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="animate-fade-in">
                <h3 className="text-primary fw-bold display-4">500+</h3>
                <p className="lead">Estudiantes graduados</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="animate-fade-in delay-1">
                <h3 className="text-primary fw-bold display-4">95%</h3>
                <p className="lead">Tasa de empleabilidad</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="animate-fade-in delay-2">
                <h3 className="text-primary fw-bold display-4">4.9/5</h3>
                <p className="lead">Satisfacción estudiantil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamps Section */}
      <section className="py-5" style={{backgroundColor: 'var(--color-letra)'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3 animate-fade-in">Nuestros Bootcamps</h2>
            <p className="lead animate-fade-in" style={{color: 'var(--color-secondary)'}}>Programas intensivos diseñados para impulsar tu carrera tech</p>
          </div>
          
          {error && (
            <div className="alert alert-warning text-center" role="alert">
              {error}
            </div>
          )}
          
          <div className="row g-4">
            {bootcamps.filter(bootcamp => bootcamp.active).map((bootcamp, index) => (
              <div key={bootcamp.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm bootcamp-card animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="position-relative">
                    <img 
                      src={bootcampImages[bootcamp.id] || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                      className="card-img-top bootcamp-image" 
                      alt={bootcamp.name}
                    />
                    <div className="card-overlay">
                      <span className="badge" style={{backgroundColor: 'var(--color-button)', color: 'white'}}>Disponible</span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h3 className="h5 card-title text-primary">{bootcamp.name}</h3>
                    <p className="card-text" style={{color: 'var(--color-secondary)'}}>{bootcamp.description}</p>
                    <div className="mt-4">
                      <h6 className="mb-2" style={{color: 'var(--color-primary)'}}>Tecnologías:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {bootcamp.technologies.map((tech, index) => (
                          <span key={index} className="badge bg-secondary tech-tag">{tech}</span>
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

      {/* Testimonials Section */}
      <section className="py-5 parallax-section" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white mb-3">Lo que dicen nuestros estudiantes</h2>
            <p className="lead text-white-50">Experiencias reales de transformación profesional</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card testimonial-card animate-fade-in">
                <div className="card-body p-4 text-center">
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name}
                    className="rounded-circle mb-3"
                    width="80"
                    height="80"
                  />
                  <h5 className="card-title text-primary">{testimonials[activeTestimonial].name}</h5>
                  <p className="text-muted">{testimonials[activeTestimonial].role}</p>
                  <p className="card-text lead">"{testimonials[activeTestimonial].text}"</p>
                </div>
              </div>
              
              <div className="d-flex justify-content-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm mx-1 ${index === activeTestimonial ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTestimonial(index)}
                  >
                    &bull;
                  </button>
                ))}
              </div>
            </div>
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
              <div className="text-center p-4 h-100 feature-card animate-fade-in-up">
                <div className="feature-icon rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white'}}>
                  <i className="bi bi-speedometer2 fs-2"></i>
                </div>
                <h4 className="h5 mb-3 text-primary">Aprendizaje intensivo</h4>
                <p className="text-muted">Programas concentrados que te llevan de principiante a profesional en pocos meses.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4 h-100 feature-card animate-fade-in-up delay-1">
                <div className="feature-icon rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" 
                  style={{width: '80px', height: '80px', backgroundColor: 'var(--color-primary)', color: 'white'}}>
                  <i className="bi bi-people-fill fs-2"></i>
                </div>
                <h4 className="h5 mb-3 text-primary">Instructores expertos</h4>
                <p className="text-muted">Aprende de profesionales con experiencia real en la industria tecnológica.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center p-4 h-100 feature-card animate-fade-in-up delay-2">
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

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Preguntas frecuentes</h2>
            <p className="lead" style={{color: 'var(--color-secondary)'}}>Resolvemos tus dudas más comunes</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      ¿Necesito experiencia previa en programación?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      No, nuestros bootcamps están diseñados para comenzar desde cero. Solo necesitas motivación y compromiso.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      ¿Qué duración tienen los programas?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      La mayoría de nuestros bootcamps tienen una duración de 4 a 6 meses, dependiendo de la intensidad horaria.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      ¿Ofrecen opciones de financiamiento?
                    </button>
                  </h3>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Sí, ofrecemos varias opciones de financiamiento, incluyendo pagos mensuales y planes de pago diferido.
                    </div>
                  </div>
                </div>
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
                <Link to="/register" className="btn btn-light btn-lg px-5 animate-fade-in" style={{color: 'var(--color-primary)'}}>
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