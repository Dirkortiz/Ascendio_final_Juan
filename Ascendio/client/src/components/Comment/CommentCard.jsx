import React from "react";
import './CommentCard.scss'
import { Col, Row } from "react-bootstrap";

export const CommentCard = ({ elem }) => {
  return (
    <Row className="CommentDiv mt-4">
      <Col className="d-flex flex-column">
        <h6>{elem.nickname}</h6>
        <p>{elem.description}</p>
      </Col>
    </Row>
  );
};
