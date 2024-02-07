import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const ConfirmationUser = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    console.log(token);
    axios
      .put(`http://localhost:3000/users/confirmationuser/${token}`)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Row className="d-flex justify-content-center p-5">
      <Col md={4}>
        <h2>No se ha podido confirmar su registro</h2>
      </Col>
    </Row>
  );
};
