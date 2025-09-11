import React from "react";

export default function Footer() {
  return (
    <>
     <footer className="footercontent text-light fixed-bottom py-4">
      <div className="container-fluid justify-content-center">
        <span className="text-light">
          &copy; {new Date().getFullYear()} Kodigo Appi. Todos los derechos reservados.
        </span>
      </div>
    </footer>
    </>
  );
}
