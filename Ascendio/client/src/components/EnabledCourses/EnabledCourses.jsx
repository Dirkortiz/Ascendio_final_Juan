import axios from "axios";
import React from "react";
import { Button, Card, Col } from "react-bootstrap";

export const EnabledCourses = ({ elem, setUpdateCourses }) => {
  const disableOneCourse = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableonecourse/${id}`)
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
          variant="top"
          style={{ height: "16rem", objectFit: "cover" }}
          src={`http://localhost:3000/images/cursos/${elem.img}`}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="cardtitle">Nombre: {elem.title}</Card.Title>
          <Card.Text className="d-flex justify-content-start descriptioncard flex-grow-1">
            Descripción: {elem.description}
          </Card.Text>
          <Card.Text className="d-flex justify-content-center mt-auto">
            <button
              className="Button3"
              onClick={() => disableOneCourse(elem.course_id)}
            >
              Desactivar Curso
            </button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
