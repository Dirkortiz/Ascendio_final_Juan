import React, { useContext, useEffect, useState } from "react";
import "./users.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import axios from "axios";
import "../../../public/stylesheets/ButtonsApp.scss";

export const Users = () => {
  const { user } = useContext(AscendioContext);
  const [showContent, setShowContent] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [swhowCourse, setShowCourse] = useState(false);
  const [statisticsUser, setStatisticsUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/statisticsuser/${user.user_id}`)
      .then((res) => {
        setStatisticsUser(res.data.datos);
      })
      .catch((err) => console.log(err));
  }, [user]);

  let ratioTotal = 0;
  if (statisticsUser?.num_correct_posts !== 0) {
    ratioTotal =
      parseFloat(
        statisticsUser?.num_correct_posts / statisticsUser?.num_trades
      ) * 100;
  }

  return (
    <main>
      <Row className="UserProfileScss py-5">
        <Col xs={12} lg={4} className="d-flex justify-content-center pt-2 ">
          <div>
            <div className="avatarProfilo">
              {user?.img ? (
                <img src={`http://localhost:3000/images/users/${user.img}`} />
              ) : (
                <p className="letteruser">
                  {user?.nickname.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p className="PorcentajeAciertos">Fiabilidad: {parseFloat(ratioTotal.toFixed(2))} %</p>
              <h2 className="m-0">
                {user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)}
              </h2>
              <p className="m-0 mb-2">
                {user?.name.charAt(0).toUpperCase() + user.name.slice(1)}{" "}
                {user?.lastname.charAt(0).toUpperCase() +
                  user.lastname.slice(1)}
              </p>
              <button className="Button3" onClick={() => navigate("/edituser")}>
                EDITAR USUARIO
              </button>
            </div>
          </div>
        </Col>

        <Col xs={12} lg={8} className=" text-center py-5">
          {statisticsUser && (
            <div>
              <Row>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Trades acertados</p>
                    <p className="TradesGreen">
                      {statisticsUser.num_correct_posts}
                    </p>
                  </div>
                </Col>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Trades fallidos</p>
                    <p className="TradesRed">
                      {statisticsUser.num_incorrect_posts}
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
                    <p className="PDatosPerfil">Post publicados</p>
                    <Link
                      to={`/userposts/${user.user_id}`}
                      className="linksPerfil"
                    >
                      {statisticsUser.num_posts}
                    </Link>
                  </div>
                </Col>

                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Cursos publicados</p>
                    <Link
                      to={`/oneusercourses/${user.user_id}`}
                      className="linksPerfil"
                    >
                      {statisticsUser.num_courses}
                    </Link>
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
                    <Link
                      to={`/userfollowers/${user.user_id}`}
                      className="linksPerfil"
                    >
                      {statisticsUser.num_followers}
                    </Link>
                  </div>
                </Col>
                <Col
                  xs={6}
                  lg={6}
                  className="d-flex justify-content-center p-0"
                >
                  <div>
                    <p className="PDatosPerfil">Seguidos</p>
                    <Link
                      to={`/userfollowing/${user.user_id}`}
                      className="linksPerfil"
                    >
                      {statisticsUser.num_following_users}
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col className="p-0" xs={12} lg={12}>
          <div className="d-flex justify-content-between DivGrisParaBotones w-100 mt-3 mb-3">
            <div className="BobotnesCREARYCURSOS d-flex flex-column">
              <Button
                className="Button2 "
                onClick={() => {
                  setShowContent(!showContent);
                  setShowCourse(false);
                }}
              >
                CREAR CONTENIDO
              </Button>
            </div>

            <div className="BobotnesCREARYCURSOS d-flex flex-column">
              <Button
                className="Button2 "
                onClick={() => {
                  setShowCourse(!swhowCourse);
                  setShowContent(false);
                }}
              >
                MIS CURSOS
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={12} className="p-0">
          {swhowCourse && (
            <div className="d-flex flex-column">
              <Button
                className="Button5"
                onClick={() => navigate("/purchasecourse")}
              >
                <img src="../../../public/images/iconos/cursosadquiridos.png" alt="" />
                Cursos Comprados
              </Button>
              <Button
                className="Button5"
                onClick={() => navigate("/savecourse")}
              >
                <img src="../../../public/images/iconos/cursosguardados.png" alt="" />
                Cursos Guardados
              </Button>
            </div>
          )}
          {showContent && (
            <div className="d-flex flex-column icons-users">
              <Button
                className="Button5"
                onClick={() => navigate("/createtrade")}
              >
                <img src="../../../public/images/iconos/tradepost.png" alt="" />
                Crear TradePost
              </Button>
              <Button
                className="Button5"
                onClick={() => navigate("/creategeneralpost")}
              >
                <img
                  src="../../../public/images/iconos/generalpost.png"
                  alt=""
                />
                Crear GeneralPost
              </Button>

              <Button
                className="Button5"
                onClick={() => navigate("/createcourse")}
              >
                <img
                  src="../../../public/images/iconos/subircurso.png"
                  alt=""
                />
                Crear Curso
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </main>
  );
};
