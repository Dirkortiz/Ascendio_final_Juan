import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column ">
      <h2>Política de Privacidad</h2>

      <p>
        Gracias por utilizar Ascendio. Aquí te explicamos cómo manejamos tu información:
      </p>

      <h3>Registro de Usuarios</h3>
      <p>
        Para acceder a ciertas funciones, es necesario registrarse. Recopilamos
        información como tu nombre, dirección de correo electrónico y detalles
        de la cuenta para proporcionarte una experiencia personalizada.
      </p>

      <h3>Seguimiento de Usuarios</h3>
      <p>
        Como parte de la funcionalidad de red social, puedes seguir a otros
        usuarios y ser seguido. La información sobre a quién sigues y quién te
        sigue es visible para otros usuarios en el sitio.
      </p>

      <h3>Uso de Datos</h3>
      <p>
        Utilizamos la información recopilada para mejorar nuestros servicios,
        personalizar la experiencia del usuario y proporcionar contenido
        relevante. No compartimos tu información con terceros sin tu
        consentimiento, excepto cuando sea necesario para cumplir con las leyes
        aplicables.
      </p>

      <h3>Seguridad de Datos</h3>
      <p>
        Implementamos medidas de seguridad para proteger tu información. Sin
        embargo, ten en cuenta que ninguna transmisión por Internet o
        almacenamiento electrónico es completamente seguro, y no podemos
        garantizar la seguridad absoluta de tus datos.
      </p>
      <Button onClick={() => navigate("/")}>volver</Button>
    </div>
  );
};
