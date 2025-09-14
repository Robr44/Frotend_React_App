import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbarcontent fixed-top">
      <div className="container">
        <Link className="navbar-brand text-light fw-bold" to="/" onClick={handleNavLinkClick}>
          <i className="bi bi-code-slash me-2"></i>Kodigo App
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
                onClick={handleNavLinkClick}
              >
                Inicio
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} 
                    to="/dashboard"
                    onClick={handleNavLinkClick}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-info ms-lg-3 mt-2 mt-lg-0" 
                    style={{ backgroundColor: "var(--color-button)", color: "white" }} 
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} 
                    to="/register"
                    onClick={handleNavLinkClick}
                  >
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} 
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}