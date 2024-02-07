import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./oneUserAllCourses.scss";

export const OneUserAllCourses = ({
  user_id,
  showCourses,
  setShowCourses,
  traderprofile,
}) => {
  const [userCourses, setUserCourses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:3000/courses/oneusercourses/${user_id}`)
        .then((res) => {
          console.log(res.data[0]);
          if (res.data[0] === undefined) {
            setUserCourses(null);
          } else {
            setUserCourses(res.data);
          }
          console.log(userCourses);
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }
  }, [user_id]);

  return (
    <Row>
      <Col>
        {userCourses ? userCourses.map((elem) => {
          return (
            <Card
              style={{ width: "18rem", marginBottom: "1rem" }}
              key={elem.course_id}
              className="user-course-padre"
            >
              <Card.Img
                className="user-courses-courseimg "
                variant="top"
                src={`http://localhost:3000/images/cursos/default.png`}
              />
              <Card.Title className="user-courses-coursetitle">
                <h3>{elem.title}</h3>
              </Card.Title>
              <Card.Body>
                <p>Descripción: {elem.description}</p>
                <p>Tags: {elem.tags}</p>
                <p>Precio: {elem.price}</p>
              </Card.Body>
            </Card>
          );
        }):<h4 className="alltrades-error-nohaypostsnitrades">
        Este usuario no tiene{" "}
        <span className="alltrades-error-nohaypostsnitrades-hijo">
          Cursos
        </span>{" "}
        creados.
      </h4>}
      </Col>
    </Row>
  );
};
