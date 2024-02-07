import axios from "axios";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import "./disabledCourse.scss";

export const DisabledCourses = ({ elem, setUpdateCourses }) => {
  const enableOneCourse = (id) => {
    axios
      .put(`http://localhost:3000/admin/enableonecourse/${id}`)
      .then((res) => {
        console.log(res);
        setUpdateCourses(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
      <Card
        style={{ width: "100%" }}
        className="mapeoAllCourse text-center mb-4 d-flex flex-column"
      >
        <Card.Img
          style={{ height: "16rem", objectFit: "cover" }}
          variant="top"
          src={`http://localhost:3000/images/cursos/${elem.img}`}
        />
        <Card.Body className="d-flex flex-column">
          <div>
            <Card.Title className="cardtitle">Nombre: {elem.title}</Card.Title>
            <Card.Text className="d-flex justify-content-start descriptioncard flex-grow-1">
              Descripción: {elem.description}
            </Card.Text>
          </div>
          <div className="mt-auto">

            <button className="Button3" onClick={() => enableOneCourse(elem.course_id)}>

              Activar Curso
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
