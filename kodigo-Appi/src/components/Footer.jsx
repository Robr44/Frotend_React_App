import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footercontent text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-code-slash me-2"></i>Kodigo Bootcamps
            </h5>
            <p>Transformando vidas a través de la educación tecnológica y bootcamps intensivos.</p>
          </div>
          <div className="col-lg-2 mb-4 mb-lg-0">
            <h6 className="fw-bold">Enlaces</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Inicio</Link></li>
              <li><Link to="/dashboard" className="text-light text-decoration-none">Dashboard</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 mb-4 mb-lg-0">
            <h6 className="fw-bold">Cuenta</h6>
            <ul className="list-unstyled">
              <li><Link to="/login" className="text-light text-decoration-none">Iniciar sesión</Link></li>
              <li><Link to="/register" className="text-light text-decoration-none">Registrarse</Link></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h6 className="fw-bold">Contacto</h6>
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope me-2"></i>info@kodigo.com</li>
              <li><i className="bi bi-telephone me-2"></i>+123 456 7890</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <span>
            &copy; {new Date().getFullYear()} Kodigo Bootcamps. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}