import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import './formAddTopic.scss'

export const FormAddTopic = ({
  setShowTopic,
  course_id,
  sections,
  section_id,
  topics,
  setTopics,
  setResetCourse,
  resetCourse
}) => {
  const [newTopic, setNewTopic] = useState("");
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    setNewTopic(e.target.value);
  };

  let regexTopic = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,:?¿!¡]{0,50}$/;

  const handleSubmit = () => {
    let data = { course_id, section_id, newTopic };
    console.log("data", data);
    if (!regexTopic.test(newTopic)) {
      setMsgError("No se permiten más de 50 caracteres");
    }else if(newTopic === ''){
      setMsgError("Escribe el título del tema");
    } else if (newTopic !== "") {
      axios
        .post("http://localhost:3000/courses/addtopic", data)
        .then((res) => {
          console.log(res.data);
          setResetCourse(!resetCourse);
          setNewTopic("");
          setShowTopic(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };
  return (
    <Row className="formTopic">
      <Col>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título del tema</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="Título del tema"
              value={newTopic}
              onChange={handleChange}
            />
            <span>
              <p style={{ color: '#E25252'}}>{msgError}</p>
            </span>
            
            <div className="botonFormTopic  d-flex justify-content-center mt-3">
              <Button
                className="botonesTopic mx-2"
                onClick={handleSubmit}
              >
                Aceptar
              </Button>
              <Button
                className="botonesTopic mx-2"
                onClick={() => setShowTopic(false)}
              >
                Cancelar
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};
