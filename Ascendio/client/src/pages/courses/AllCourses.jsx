import React, { useEffect, useState } from "react";
import "./courses.scss";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { textSensitive } from "../../helpers/utils";
import "../../../public/stylesheets/ButtonsApp.scss";
import { CardOneCourse } from "../../components/CardOneCourse/CardOneCourse";

export const AllCourses = () => {
  const [allcourses, setAllcourses] = useState([]);
  const [findCourse, setFindCourse] = useState();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(false);

  useEffect(() => {
    let url;
    if (order === false) {
      url = `http://localhost:3000/courses/callcourses`;
    } else {
      url = `http://localhost:3000/courses/callcoursesdates`;
    }
    axios
      .get(url)
      .then((res) => {
        console.log("ews", res.data);
        setAllcourses(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [order]);
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
      <header className="headerAllCourses">
        <div
          className="d-flex justify-content-between align-items-center py-5 divHeader"
          style={{ color: "white" }}
        >
          <div className="text-center">
            <h2>{order ? "Últimos cursos" : "Top cursos"}</h2>
            <button onClick={() => setOrder(!order)} className="Button3">
              {order ? "Ver top cursos" : "Ver últimos cursos"}
            </button>
          </div>
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
      <main className="mainAllCourses gap-3 pb-5">
        <Row className="justify-content-center">
          {findCourse?.map((elem) => {
            return (
              <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
                <CardOneCourse key={elem.course_id} elem={elem} />
              </Col>
            );
          })}
          {findCourse?.length === 0 && (
            <h4 className="alltrades-error-nohaypostsnitrades text-center">
              No hay
              <span className="alltrades-error-nohaypostsnitrades-hijo">
                Cursos
              </span>
              disponibles en este momento.
            </h4>
          )}
        </Row>
      </main>
    </Col>
  );
};
