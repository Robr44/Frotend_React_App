import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    } else if (formData.username.length > 50) {
      newErrors.username = 'El nombre de usuario no puede exceder 50 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'El nombre de usuario solo puede contener letras, números y guiones bajos';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await api.post('/auth/login', {
        username: formData.username.trim(),
        password: formData.password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Redireccionar al dashboard
      navigate('/dashboard');
      
      console.log('Login exitoso');

    } catch (error) {
      console.error('Error en login:', error);
      
      if (error.response) {
        const message = error.response.data?.message || 'Error en el servidor';
        setLoginError(message);
      } else if (error.request) {
        setLoginError('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      } else {

        setLoginError('Ocurrió un error inesperado. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-page min-vh-100 d-flex align-items-center" style={{ paddingTop: '80px', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h2 className="h3 mb-2 text-primary fw-bold">Iniciar Sesión</h2>
                  <p className="text-muted">Accede a tu cuenta de Kodigo</p>
                </div>

                {/* Error general de login */}
                {loginError && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{loginError}</div>
                  </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} noValidate>
                  {/* Campo Username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-medium">
                      <i className="bi bi-person me-2"></i>Nombre de usuario
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg ${errors.username ? 'is-invalid' : formData.username ? 'is-valid' : ''}`}
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ingresa tu nombre de usuario"
                      disabled={isLoading}
                      autoComplete="username"
                      maxLength={50}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.username}
                      </div>
                    )}
                  </div>

                  {/* Campo Password */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      <i className="bi bi-lock me-2"></i>Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control form-control-lg ${errors.password ? 'is-invalid' : formData.password ? 'is-valid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Ingresa tu contraseña"
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        tabIndex={-1}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                      {errors.password && (
                        <div className="invalid-feedback">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botón Submit */}
                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>
                  </div>

                  {/* Enlaces adicionales */}
                  <div className="text-center">
                    <p className="mb-2 text-muted">
                      ¿No tienes una cuenta?{' '}
                      <Link to="/register" className="text-decoration-none fw-medium">
                        Regístrate aquí
                      </Link>
                    </p>
                    <Link to="/" className="text-muted text-decoration-none small">
                      <i className="bi bi-arrow-left me-1"></i>
                      Volver al inicio
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-center mt-4">
              <div className="card bg-light border-0">
                <div className="card-body py-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Tu información está protegida con encriptación de extremo a extremo
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};