
export const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <h1>Bienvenido a Kodigo App</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Acerca de</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Sección principal */}
      <main className="landing-main">
        <section className="hero">
          <h2>Descubre nuestra plataforma</h2>
          <p>Gestiona tus proyectos y aprende a programar de manera eficiente.</p>
          <button>Comenzar</button>
        </section>

        <section className="features">
          <h3>Características</h3>
          <ul>
            <li>Fácil de usar</li>
            <li>Integración con herramientas modernas</li>
            <li>Soporte y documentación completa</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2025 Kodigo App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
