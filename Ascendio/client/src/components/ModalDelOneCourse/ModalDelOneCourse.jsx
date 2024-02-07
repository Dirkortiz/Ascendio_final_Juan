import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import './modalDelOneCourse.scss'
import "../../../public/stylesheets/ButtonsApp.scss";

export const ModalDelOneCourse = ({
  showModalDelete,setShowModalDelete, deleteCourse,course_id}) => {

  const handleClose = () => {
    setShowModalDelete(false);
  };

  return (
      <Col className="d-flex justify-content-center p-5" md={4}>
        <Modal show={showModalDelete} onHide={handleClose}>
          <Modal.Header closeButton className="modalDel">
            <Modal.Title className="cardtitle">Eliminar curso</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalDel">
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="modalDel">
                  ¿Seguro que quieres eliminar el curso?
                </Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modalDel">
            <button
               className="Button3"
              onClick={() => deleteCourse(course_id)}
            >
              Aceptar
            </button>
            <button
                 className="Button3"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
      </Col>
  );
};
