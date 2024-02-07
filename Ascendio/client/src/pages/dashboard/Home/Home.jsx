import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { AscendioContext } from "../../../context/AscendioContext";
import { useNavigate, Link } from "react-router-dom";
import { TradingViewWidget } from "../Landing/TradingViewWidget/TradingViewWidget";
import "./Home.scss";
import "../../../../public/stylesheets/ButtonsApp.scss";

export const Home = () => {
  const [lastTrades, setLastTrades] = useState([]);
  const [tradesHoy, setTradesHoy] = useState([]);
  const { user } = useContext(AscendioContext);
  const [followingUsers, setFollowingUsers] = useState([]); // Nuevo estado para almacenar usuarios seguidos
  const [showViews, setShowViews] = useState(true);
  const navigate = useNavigate();

  // para obtener los posts (generales y trades) ordenados por fecha de subida (últimos trades)
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/lasttrades")
      .then((res) => {
        console.log(res.data);
        setLastTrades(res.data);
        setTradesHoy(
          lastTrades.filter((elem) => {
            const fechaPost = new Date(elem.date);
            const fechaHoy = new Date();
            const postsDeHoy = fechaHoy.getDate() === fechaPost.getDate();
            return postsDeHoy;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showViews]);

  // para poner los botones en seguir o siguiendo si user existe
  useEffect(() => {
    if (user) {
      const user_id = user.user_id;
      axios
        .get(`http://localhost:3000/users/getfollowuser/${user_id}`)
        .then((res) => {
          // console.log(res.data);
          // esto permite que al recargar me cargue el estado followingUsers con los usuarios a los que seguimos
          setFollowingUsers(res.data.map((user) => user.followed_user_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Función para seguir o dejar de seguir a un usuario
  const pulsarSeguirONo = (id_followed) => {
    const data = [user.user_id, id_followed];
    const isFollowing = followingUsers.includes(id_followed); // devuelve true o false
    console.log(data);
    if (isFollowing) {
      // Dejar de seguir
      axios
        .delete(`http://localhost:3000/users/unfollowUser`, { data })
        .then((res) => {
          // console.log(res.data);
          setFollowingUsers((prevFollowingUsers) =>
            prevFollowingUsers.filter((userId) => userId !== id_followed)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Seguir
      axios
        .post(`http://localhost:3000/users/followUser`, data)
        .then((res) => {
          // setFollowingUsers([...followingUsers, id_followed]);
          setFollowingUsers((prevFollowingUsers) => [
            ...prevFollowingUsers,
            id_followed,
          ]);
          // console.log([...followingUsers, id_followed]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Row className="ascendio-home-row-padre">
      <Col xs={12} className="ascendio-home-row-hijo">
        <h2>Novedades de hoy</h2>
      </Col>
      <Col
        xs={2}
        className="ascendio-home-row-hijo d-flex gap-1 DivGrisParaBotones"
      >
        <Button className="Button2" onClick={() => setShowViews(false)}>
          POSTS
        </Button>
        <Button className="Button2" onClick={() => setShowViews(true)}>
          GRÁFICA
        </Button>
      </Col>
      <Col xs={12}>
        {showViews ? (
          <Row>
            <Col>
              <TradingViewWidget />
            </Col>
          </Row>
        ) : (
          <Row className="ascendio-home-post-padre">
            <Col className="ascendio-home-col-cards AllTradesPostGap col-12">
              {tradesHoy[0] !== undefined ? (
                tradesHoy.map((elem) => {
                  return (
                    <Card key={elem.post_id} className="ESTILOCARDGENERAL">
                      <Card.Text className="UserCARD">
                        <div className="avatarCard">
                          {elem?.img ? (
                            <img
                              src={`http://localhost:3000/images/users/${elem.img}`}
                            />
                          ) : (
                            <p className="letteruser">
                              {elem?.nickname.charAt(0).toUpperCase()}
                            </p>
                          )}
                        </div>
                        <p>
                          <Link
                            className="home-link-traders"
                            to={`http://localhost:5173/traderprofile/${elem.user_id}`}
                          >
                            {elem.nickname}
                          </Link>
                        </p>
                      </Card.Text>
                      <div className="DivImagenCard">
                        {elem.image_name !== null ? (
                          <Card.Img
                            variant="top"
                            src={
                              elem.type === 1
                                ? `http://localhost:3000/images/generalPost/${elem.image_name}`
                                : `http://localhost:3000/images/trades/${elem.image_name}`
                            }
                            className="ascendio-home-card-imagen"
                          />
                        ) : (
                          <Card.Img
                            className="CardSinFoto"
                            variant="top"
                            src={
                              "../../../../public/images/iconos/logoascendio.png"
                            }
                          />
                        )}
                      </div>
                      {elem.type === 1 && ( // TIPO POST GENERAL
                        <Card.Body>
                          <Card.Title>
                            <h3>General Post</h3>
                          </Card.Title>

                          <Card.Text>{elem.description}</Card.Text>
                          {user.user_id !== elem.user_id ? (
                            <Button
                              className="ButtonSEGUIR"
                              variant="primary"
                              onClick={() => pulsarSeguirONo(elem.user_id)}
                            >
                              {followingUsers.includes(elem.user_id)
                                ? "Siguiendo"
                                : "Seguir"}
                            </Button>
                          ) : null}
                          <button
                            className="Button3"
                            onClick={() => {
                              navigate(`/OneTradePost/${elem.post_id}`);
                            }}
                          >
                            COMENTARIOS
                          </button>
                        </Card.Body>
                      )}
                      {/* Trades */}
                      {elem.type === 2 && (
                        <Card.Body>
                          <Card.Title>
                            <h3>Trade de {elem.category_name}</h3>
                          </Card.Title>
                          <Card.Text>
                            {elem.currency !== null ? (
                              <p>
                                Currency: <span>{elem.currency}</span>
                              </p>
                            ) : null}
                            <p>
                              Descripción: <span>{elem.description}</span>
                            </p>
                            <p>
                              Precio de entrada: <span>{elem.entry_price}</span>
                            </p>
                            <p>
                              Precio de stop: <span>{elem.stop_loss}</span>
                            </p>
                            <p>
                              Precio Profit: <span>{elem.take_profit}</span>
                            </p>
                            <p>
                              Estado:{" "}
                              <span>
                                {elem.correct === null && "Trade Pendiente"}
                                {elem.correct === 0 && "Trade Errado"}
                                {elem.correct === 1 && "Trade Acertado"}
                              </span>
                            </p>
                          </Card.Text>
                          <div className="ascendio-home-card-botonera">
                            {user.user_id !== elem.user_id ? (
                              <Button
                                className="ButtonSEGUIR"
                                variant="primary"
                                onClick={() => pulsarSeguirONo(elem.user_id)}
                              >
                                {followingUsers.includes(elem.user_id)
                                  ? "Siguiendo"
                                  : "Seguir"}
                              </Button>
                            ) : null}
                            <button
                              className="Button3 button-with-ellipsis"
                              onClick={() => {
                                navigate(`/OneTradePost/${elem.post_id}`);
                              }}
                            >
                              COMENTARIOS
                            </button>
                          </div>
                        </Card.Body>
                      )}
                    </Card>
                  );
                })
              ) : (
                <p>Todavía no hay posts publicados</p>
              )}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};
