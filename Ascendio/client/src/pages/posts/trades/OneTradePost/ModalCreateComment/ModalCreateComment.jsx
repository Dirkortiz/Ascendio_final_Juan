import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../../context/AscendioContext";
import axios from "axios";
import "./ModalCreateComment.scss";
import "../../../../../../public/stylesheets/ButtonsApp.scss";
import "../../../../../../public/stylesheets/InputDesplegableApp.scss";

const initialValue = {
  message: "",
};

export const ModalCreateComment = ({ showModal, setShowModal, oneTrade }) => {
  const [comment, setComment] = useState(initialValue);
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
  };

  const handleSubmit = () => {
    console.log(oneTrade);
    console.log(comment);
    axios
      .post("http://localhost:3000/comments/createcomment", {
        comment,
        oneTrade,
        user,
      })
      .then((res) => {
        console.log(res);
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal show={showModal} className="modal-comment-padre">
      <Modal.Body className="modal-comment-body">
        <Modal.Title className="modal-comment-title">
          Añadir comentario
        </Modal.Title>
        <Form className="FormulariosContainer">
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Control
              maxlength="240"
              type="text"
              name="message"
              placeholder="¿Que quieres decir?"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <div className="botonera-modal-post">
          <Button className="Button3" variant="primary" onClick={handleSubmit}>
            Aceptar
          </Button>
          <Button
            className="Button1"
            variant="primary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
