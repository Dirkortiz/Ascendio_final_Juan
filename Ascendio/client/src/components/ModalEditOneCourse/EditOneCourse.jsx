import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";
import "./EditOneCourse.scss";
import "./estilocreacion.scss";

// import "../../../public/stylesheets/FormulariosEInputs.scss";
const initialValue = {
  title: "",
  description: "",
  price: "",
};
export const EditOneCourse = ({
  showModal,
  setShowModal,
  oneCoursePpal,
  setOneCoursePpal,
}) => {
  const { user } = useContext(AscendioContext);
  const course_id = useParams().course_id;
  const [file, setFile] = useState();
  const [editCourse, setEditCourse] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  useEffect(() => {
    if (oneCoursePpal) {
      setEditCourse(oneCoursePpal);
    }
  }, [oneCoursePpal]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "price") {
      newValue = value.replace(/^(?:(\d{1,5}(?:\.\d{0,2})?)|\D+).*$/g, "$1");
    }
    setEditCourse({ ...editCourse, [name]: newValue });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleClose = () => {
    setShowModal(false);
    setMsgError("");
  };
  let regexPrice = /^(?:(\d{1,5}(?:\.\d{0,2})?)|\D+).*$/g;
  let regexTitle = /^[\s\S'´`]{0,50}$/;
  let regexDescription = /^[\s\S'´`]{0,250}$/;
  const handleSubmit = (e) => {
    if (!regexTitle.test(editCourse.title)) {
      setMsgError("No se permiten más de 50 caracteres");
    } else if(editCourse.title === ''){
      setMsgError("Escribe el título");
    } else if (!regexDescription.test(editCourse.description)) {
      setMsgError("No se permiten más de 250 caracteres");
    } else if(editCourse.description === ''){
      setMsgError("Escribe la descripción");
    } else if (!regexPrice.test(editCourse.price)) {
      setMsgError("No se permiten más de 99999 euros");
    } else {
      const formData = new FormData();
      formData.append(
        "editarCurso",
        JSON.stringify({ ...editCourse, user_id: user.user_id })
      );
      formData.append("file", file);
      axios
        .put(`http://localhost:3000/courses/editcourse/${course_id}`, formData)
        .then((res) => {
          console.log(res);
          setShowModal(false);
          setOneCoursePpal(editCourse);
          setMsgError("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Row className="d-flex justify-content-center p-5  ">
      <Col md={4}>

        <Modal
          show={showModal}
          onHide={handleClose}
          className="EdicionCursosContainerFormulario text-center"
        >
          <Modal.Header closeButton className="modalDel  ">

            <Modal.Title className="edittitle">Editar curso</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalDel">
            <Form>
              <Form.Group
                controlId="formFile"
                className=" d-flex justify-content-center mb-3"
              >
                <div className="d-flex flex-column">
                  <Form.Label>Cambiar</Form.Label>
                  <Form.Label>
                    {" "}
                    {editCourse?.img && editCourse?.img !== "default.jpg" ? (
                      <img
                        className="imgcourseedicion"
                        src={`http://localhost:3000/images/cursos/${editCourse.img}`}
                        alt=""
                      />
                    ) : (
                      <span className="imagencursodefecto material-symbols-outlined addIcon">
                        photo_camera
                      </span>
                    )}
                  </Form.Label>
                </div>
                <Form.Control type="file" onChange={handleFile} hidden />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Título </Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Titulo"
                  name="title"
                  value={editCourse?.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  value={editCourse?.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="€"
                  name="price"
                  value={editCourse?.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          {msgError && <h5 className="msgerror">{msgError}</h5>}
          <Modal.Footer className="modalDel">
            <button
              variant="outline-success"
              className="me-3 Button3"
              onClick={handleSubmit}
            >
              Aceptar
            </button>
            <button
              variant="outline-success"
              className="me-3 Button3"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};