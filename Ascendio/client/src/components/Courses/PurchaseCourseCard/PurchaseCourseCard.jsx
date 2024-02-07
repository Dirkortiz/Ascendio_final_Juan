import React, { useContext, useEffect, useState } from "react";
import "./purchaseCourseCard.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { RatingStars } from "../RatingStars/RatingStars";
import { AscendioContext } from "../../../context/AscendioContext";
import "../../../../public/stylesheets/ButtonsApp.scss";
import { CardOneCourse } from "../../CardOneCourse/CardOneCourse";


export const PurchaseCourseCard = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [tags, setTags] = useState("")
  const { user_id } = useContext(AscendioContext).user;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getonepurchasedcourse/${user_id}`)
      .then((res) => {
        setAllcourses(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_id]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const tempArray = allcourses.filter((e) => {
      return textSensitive(e.title, filter);
    });
    setFindCourse(tempArray);
  }, [allcourses, filter]);
  console.log("0000", findCourse);

  return (
    <Col>
      <header className="headerCursosComprados">
        <div
          className="d-flex justify-content-between divHeader py-5"
          style={{ color: "white" }}
        >
          <h2 className="text-center">Mis cursos comprados</h2>
          <div className="input-container">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              onChange={handleChange}
              placeholder="Buscar"
              value={filter}
              className="buscador"
            />
          </div>
        </div>
      </header>
      <main className="mainCursosComprados gap-3 pb-5">
      <Row className="justify-content-center">
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
              <CardOneCourse
              elem={elem} />
          </Col>
          );
        })}
        {findCourse?.length === 0 && (
          <h4 className="alltrades-error-nohaypostsnitrades text-center">
          No hay{" "}
          <span className="alltrades-error-nohaypostsnitrades-hijo">
            Cursos
          </span>{" "}
          comprados en este momento.
        </h4>
        )}
        </Row>
      </main>
    </Col>
  );
};
