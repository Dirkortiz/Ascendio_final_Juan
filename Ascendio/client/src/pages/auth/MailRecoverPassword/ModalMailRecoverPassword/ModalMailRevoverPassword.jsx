import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Register/ModalRegister/ModalRegister.scss"
import "../../../../../public/stylesheets/ButtonsApp.scss"

export const ModalMailRevoverPassword = ({ showModal, setShowModal,email }) => {
  const navigate = useNavigate();

  return (
    <Modal show={showModal} className="RegisterModalSCSS">
      <Modal.Header>
        <Modal.Title>
          Solicitud de recuperación de contraseña aceptada
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Para continuar, revisa tu correo electronico: <span>{email}</span>
        {/* Ver si es posible dejar el correo en forma de link para que te mande a outlook, gmail o lo que sea */}
      </Modal.Body>
      <Modal.Footer>
        <Button className="Button1" variant="primary" onClick={() => navigate("/login")}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
