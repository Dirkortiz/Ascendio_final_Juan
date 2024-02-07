import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./ResourceViewer.scss";

export const ResourceViewer = () => {
  const [titles, setTitles] = useState();
  const navigate = useNavigate();
  let { course_id, link, type, section_id } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getOneBreadCrumbs/${course_id}/${section_id}`
      )
      .then((res) => {
        console.log(res.data);
        setTitles(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let urlbase = "https://www.youtube.com/embed/";
  if (type === "1") {
    urlbase = "http://localhost:3000/images/resource/";
  }
  console.log(type);
  return (
    <Row className="resourceView py-1">
      <Col xs={12} className="column1">
        <Breadcrumb className="linkes">
          <div className="back">
            <Breadcrumb.Item
              onClick={() => navigate(-1)}
              className="d-flex justify-content-center align-items-center"
            >
              {titles?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => navigate(-1)}
              className="d-flex justify-content-center align-items-center"
            >
              {titles?.section_title}
            </Breadcrumb.Item>
          </div>
        </Breadcrumb>
      </Col>
      <Col
        xs={12}
        className="column2 justify-content-center text-center align-items-center"
      >
        <iframe
          className={type === "1" ? "pdf" : "video"}
          src={`${urlbase}${link}`}
          frameBorder="0"
        ></iframe>
      </Col>
    </Row>
  );
};
