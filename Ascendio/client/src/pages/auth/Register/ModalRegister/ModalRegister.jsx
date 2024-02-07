import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ModalRegister.scss"
import "../../../../../public/stylesheets/ButtonsApp.scss"

export const ModalRegister = ({ showModal, setShowModal, email }) => {
  const navigate = useNavigate();
  return (
    
      <Modal show={showModal} className="RegisterModalSCSS" centered>
        <Modal.Header>
          <Modal.Title>Confirmación email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, confirme su registro en el correo enviado a <span>{email}</span>
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
