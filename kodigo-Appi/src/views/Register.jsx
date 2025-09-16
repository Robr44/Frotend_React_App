import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);

      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      reset();
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error en el registro. Inténtalo de nuevo.";
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>Crear Nueva Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
              })}
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Registrarme
          </button>
        </form>
        <p className="redirect-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
