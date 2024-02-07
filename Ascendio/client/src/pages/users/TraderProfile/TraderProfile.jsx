import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { OneUserAllPosts } from "./OneUserAllPosts/OneUserAllposts";
import "./traderProfile.scss";
import { OneUserAllCourses } from "./OneUserAllCourses/OneUserAllCourses";

export const TraderProfile = () => {
  const [traderprofile, setTraderprofile] = useState();
  const [traderPosts, setTraderPosts] = useState();
  const [showPosts, setShowPosts] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/traderprofile/${user_id}`)
      .then((res) => {
        // console.log("datos del usuario", res.data);
        setTraderprofile(res.data[0]);
        setTraderPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowPost = () => {
    setShowPosts(!showPosts);
    setShowCourses(false);
  };

  const handleShowCourses = () => {
    setShowCourses(!showCourses);
    setShowPosts(false);
  };

  return (
    <>
      <Row className="traderProfileScss">
        <Col xs={12} lg={12}>
              <button
                variant="primary"
                onClick={() => navigate("/showallusers")}
                className="Button4"
              >
                VOLVER
              </button>
            </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-center p-0 ">
          <div>
            <div className="avatarProfilo">
              {traderprofile?.user_image ? (
                <img
                  src={`http://localhost:3000/images/users/${traderprofile.user_image}`}
                />
              ) : (
                <p className="letteruser">
                  {traderprofile?.nickname.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p className="PorcentajeAciertos">
                Fiabilidad:{" "}
                {(traderprofile?.correct_posts_count /
                  traderprofile?.incorrect_posts_count) *
                  100 || 0}{" "}
                %
              </p>
              <h2 className="m-0">
                {(
                  traderprofile?.nickname.charAt(0).toUpperCase() +
                  traderprofile?.nickname.slice(1)
                ).toString()}
              </h2>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={8} className=" text-center p-0">
          {traderprofile && (
            <div>
              <Row>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Trades acertados</p>
                    <p className="TradesGreen">{traderprofile?.total_posts}</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Trades Fallidos</p>
                    <p className="linksPerfil">
                      {traderprofile?.incorrect_posts_count}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Post Publicados</p>
                    <p className="linksPerfil">{traderprofile?.total_posts}</p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Cursos publicados</p>
                    <p className="linksPerfil">
                      {traderprofile?.total_courses}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Seguidores</p>
                    <p className="linksPerfil">
                      {traderprofile?.followers_count}
                    </p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Seguidos</p>
                    <p className="linksPerfil">
                      {traderprofile?.following_count}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col className="p-0" xs={12} lg={12}>
          <div className="d-flex DivGrisParaBotones mt-3 mb-3">
            <div className="BotonUser d-flex flex-column">
              <Button
                variant="primary"
                onClick={handleShowPost}
                className="Button2"
              >
                MOSTRAR POSTS
              </Button>
            </div>
            <div className="BotonUser d-flex flex-column">
              <Button
                variant="primary"
                onClick={handleShowCourses}
                className="Button2"
              >
                MOSTRAR CURSOS
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={12} className="p-0">
          <div>
            {showPosts && (
              <OneUserAllPosts
                user_id={user_id}
                showPost={showPosts}
                setShowPost={setShowPosts}
                traderprofile={traderprofile}
              />
            )}
          </div>
          <div>
            {showCourses && (
              <OneUserAllCourses
                user_id={user_id}
                setShowCourses={setShowCourses}
                showCourses={showCourses}
                traderprofile={traderprofile}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
