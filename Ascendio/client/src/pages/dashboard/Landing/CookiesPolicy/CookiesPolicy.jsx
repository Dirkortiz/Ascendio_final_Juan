import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CookiesPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column ">
      <h2>Política de Cookies</h2>

      <p>
        Gracias por visitar Ascendio.
        Esta política explica cómo utilizamos cookies y tecnologías similares.
      </p>

      <h3>¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu
        dispositivo cuando visitas un sitio web. Estas cookies nos ayudan a
        mejorar tu experiencia de usuario al recordar tus preferencias y
        proporcionar contenido personalizado.
      </p>

      <h3>Tipos de Cookies</h3>
      <p>
        Utilizamos cookies esenciales para el funcionamiento del sitio y cookies
        de rendimiento para analizar cómo los usuarios interactúan con nuestro
        contenido. También podemos utilizar cookies de terceros para funciones
        específicas, como la integración de redes sociales.
      </p>

      <h3>Control de Cookies</h3>
      <p>
        Puedes controlar y/o eliminar las cookies según tus preferencias.
        Consulta la configuración de tu navegador para gestionar las cookies.
        Ten en cuenta que la desactivación de ciertas cookies puede afectar la
        funcionalidad del sitio.
      </p>

      <h3>Aceptación de Cookies</h3>
      <p>
        Al continuar utilizando nuestro sitio, aceptas el uso de cookies de
        acuerdo con esta política. Si no estás de acuerdo, te recomendamos
        ajustar la configuración de tu navegador o abstenerse de utilizar
        nuestro sitio.
      </p>

      <Button onClick={() => navigate("/")}>volver</Button>
    </div>
  );
};
