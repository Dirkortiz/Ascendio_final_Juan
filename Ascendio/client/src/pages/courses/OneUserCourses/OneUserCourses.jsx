import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { textSensitive } from "../../../helpers/utils";
import { ModalDelOneCourse } from "../../../components/ModalDelOneCourse/ModalDelOneCourse";
import "./OneUserCourses.scss";
import "../../../../public/stylesheets/ButtonsApp.scss";

export const OneUserCourses = () => {
  const [findCourse, setFindCourse] = useState();
  const [allCoursesOneUser, setAllCoursesOneUser] = useState([]);
  const [filter, setFilter] = useState("");
  const { userCourse, setUserCourse } = useContext(AscendioContext);
  const user_id = useParams().user_id;
  const [course, setCourse] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const course_id = useParams().course_id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/oneusercourses/${user_id}`)
      .then((res) => {
        setAllCoursesOneUser(res.data);
        setFindCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const tempArray = allCoursesOneUser.filter((e) => {
      return textSensitive(e.title, filter);
    });
    setFindCourse(tempArray);
  }, [allCoursesOneUser, filter]);

  const deleteCourse = (course_id) => {
    axios
      .put(`http://localhost:3000/courses/deletecourse/${course_id}`)
      .then((res) => {
        console.log(res.data);
        setAllCoursesOneUser(
          allCoursesOneUser.filter((e) => e.course_id != course_id)
        );
        setShowModalDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModalDelete = (elem_id) => {
    setShowModalDelete(elem_id);
  };

  return (
    <Col>
      <header className="headerAllCoursesOneUser">
        <div
          className="d-flex justify-content-between py-5 divHeader"
          style={{ color: "white" }}
        >
          <h2 className="text-center">Mis cursos</h2>
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
      <main className="mainAllCoursesOneUser gap-3 pb-5">
        <Row className="justify-content-center">
          {findCourse?.map((elem) => {
            return (
              <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
                <Card
                  key={elem.course_id}
                  className="mapeoAllCourseOneUser text-center mb-4 d-flex flex-column"
                  style={{ width: "100%" }}
                >
                  <Card.Img
                    style={{ height: "16rem"}}
                    className={elem?.img === 'default.png' ? 'imgScale' : 'imgOneCourses'}
                    variant="top"
                    src={`http://localhost:3000/images/cursos/${elem.img}`}
                  />
                  <Card.Body className="d-flex flex-column gap-1">
                    <Card.Text className="cardtitle">{elem.title}</Card.Text>
                    <Card.Subtitle className="tagsCourse">
                      {elem.tags}
                    </Card.Subtitle>
                    <Card.Title className="d-flex justify-content-start descriptioncard flex-grow-1">
                      {elem.description}
                    </Card.Title>
                    <Card.Text className="priceCourse cardtitle px-3 my-2">
                      {Number(elem?.price) === 0 ? "GRATIS" : `${elem?.price}€`}
                    </Card.Text>
                    <div className="d-flex justify-content-evenly">
                      <button
                        onClick={() => navigate(`/course/${elem.course_id}`)}
                        className="Button3"
                      >
                        Más info
                      </button>
                      <button
                        onClick={() => openModalDelete(elem.course_id)}
                        className="Button3"
                      >
                        Eliminar
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {showModalDelete && (
          <ModalDelOneCourse
            showModalDelete={showModalDelete}
            setShowModalDelete={setShowModalDelete}
            deleteCourse={deleteCourse}
            course_id={showModalDelete}
          />
        )}

        {findCourse?.length === 0 && (
          <h4 className="alltrades-error-nohaypostsnitrades text-center">
          No hay{" "}
          <span className="alltrades-error-nohaypostsnitrades-hijo">
            Cursos
          </span>{" "}
          creados en este momento.
        </h4>
        )}
      </main>
    </Col>
  );
};
