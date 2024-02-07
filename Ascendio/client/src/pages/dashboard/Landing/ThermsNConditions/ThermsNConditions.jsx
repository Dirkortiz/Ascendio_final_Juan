import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ThermsNConditions = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column ">
      <h2>Términos y Condiciones</h2>

      <p>
        Bienvenido a nuestro Ascendio. Al acceder y utilizar este sitio, aceptas
        cumplir con estos términos y condiciones.
      </p>

      <h3>Derechos de Propiedad Intelectual</h3>
      <p>
        Todo el contenido en este sitio, incluyendo texto, gráficos, logotipos y
        software, está protegido por derechos de propiedad intelectual.
      </p>

      <h3>Uso Aceptable</h3>
      <p>
        Debes utilizar este sitio de manera ética y conforme a todas las leyes y
        regulaciones aplicables. No debes realizar actividades que puedan dañar,
        interferir o sobrecargar el funcionamiento del sitio.
      </p>

      <h3>Privacidad</h3>
      <p>
        Nuestra política de privacidad detalla cómo recopilamos, utilizamos y
        protegemos tu información personal. Al utilizar este sitio, aceptas
        nuestras prácticas de privacidad.
      </p>
      <Button onClick={() => navigate("/")}>volver</Button>
    </div>
  );
};
