import React, { useContext, useEffect, useState } from "react";
import "./saveCourseCard.scss";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { AscendioContext } from "../../../context/AscendioContext";
import "../../../../public/stylesheets/ButtonsApp.scss";
import { CardOneCourse } from "../../CardOneCourse/CardOneCourse";

export const SaveCourseCard = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false);
  const { user_id } = useContext(AscendioContext).user;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getonewishedcourse/${user_id}`)
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

  return (
    <Col>
      <header className="headerCursosGuardados">
        <div
          className="d-flex justify-content-between py-5 divHeader"
          style={{ color: "white" }}
        >
          <h2 className="text-center" >Mis cursos guardados</h2>
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
      <main className="mainCursosGuardados gap-3 pb-5">
      <Row className="justify-content-center"> 
        {findCourse?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
            <CardOneCourse
               elem={elem} />
          </Col>
          );
        })}
        </Row>
        {findCourse?.length === 0 && (
          <h4 className="alltrades-error-nohaypostsnitrades text-center">
          No tienes{" "}
          <span className="alltrades-error-nohaypostsnitrades-hijo">
            Cursos
          </span>{" "}
          guardados en este momento.
        </h4>
        )}
      </main>
    </Col>
  );
};
