import React, { useEffect } from "react";
import "./formAddSection.scss";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export const FormAddSection = ({setAddSection,course_id, resetCourse, setResetCourse}) => {

  const [newSection, setNewSection] = useState("");
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) =>{
    setNewSection(e.target.value)
  }

  let regexSection = /^[\s\S'´`]{0,50}$/;
  
  const handleSubmit = () =>{
    let data = {newSection, course_id}
      if (!regexSection.test(newSection)) {
        setMsgError("No se permiten más de 50 caracteres");
      }else if(newSection === ''){
        setMsgError("Escribe el título de la sección");
      }else if(newSection !== ''){
    axios
      .post("http://localhost:3000/courses/addsection", data)
      .then((res)=>{
        console.log(res)
        setResetCourse(!resetCourse)
        setNewSection('')
        setAddSection(false)
      })
      .catch((err)=> {
        console.log(err);
      })
    }
  }

  return (
    <Row className="formSection">
      <Col>
        <Form className="">
          <Form.Group controlId="">
            <Form.Label>Título de la sección </Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="Título de la sección"
              value={newSection}
              onChange={handleChange}
            />
            <p>{msgError}</p>
            <div className="botonFormSection d-flex justify-content-center mt-3">
              <Button 
                className="botonesSection mx-2"  onClick={handleSubmit} >Aceptar</Button>
              <Button 
                className="botonesSection mx-2" onClick={()=>setAddSection(false)}>Cancelar</Button>
            </div>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};