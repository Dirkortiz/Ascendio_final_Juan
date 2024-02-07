import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./oneUserAllPosts.scss";
import "../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";

export const OneUserAllPosts = ({
  user_id,
  showPosts,
  setShowPosts,
  traderprofile,
}) => {
  const [tradesposts, setTradesposts] = useState();
  const [generalposts, setgeneralposts] = useState();
  const [show, setShow] = useState(2);
  const navigate = useNavigate();

  // me trae los tradeposts
  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:3000/users/generalpostsuser/${user_id}`)
        .then((res) => {
          if (res.data.datos[0] === undefined) {
            setTradesposts(null);
          } else {
            setTradesposts(res.data.datos);
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }
  }, [user_id]);

  // me trae los generalposts
  useEffect(() => {
    if (user_id) {
      axios
        .get(`http://localhost:3000/users/tradespostsuser/${user_id}`)
        .then((res) => {
          if (res.data.datos[0] === undefined) {
            setgeneralposts(null);
          } else {
            setgeneralposts(res.data.datos);
            console.log(res.data.datos);
          }
        })
        .catch((err) => {
          console.log("AXIOS ERROR", err);
        });
    }
  }, [user_id]);

  // console.log("tradesposts", tradesposts);
  // console.log("generalposts", generalposts);
  console.log("traders", traderprofile);

  return (
    <>
      <div className="OneUserAllPostsScss">
        <div className="d-flex w-100 mb-3">
          <Button onClick={() => setShow(2)} className="Button4 m-0">
            TRADE POSTS
          </Button>
          <Button onClick={() => setShow(1)} className="Button4 m-0">
            GENERAL POSTS
          </Button>
        </div>
      </div>

      {/* generalpost */}
      {show === 1 && (
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {generalposts !== undefined ? (
            generalposts.map((elem) => {
              return (
                <Card className="ESTILOCARDGENERAL" key={elem.post_id}>
                  <Card.Text className="UserCARD">
                    <div className="avatarCard">
                      {elem?.img ? (
                        <img
                          src={`http://localhost:3000/images/users/${traderprofile.user_image}`}
                        />
                      ) : (
                        <p className="letteruser">
                          {traderprofile?.nickname.charAt(0).toUpperCase()}
                        </p>
                      )}
                    </div>
                    <p>{traderprofile?.nickname}</p>
                  </Card.Text>
                  <div className="DivImagenCard">
                    {elem.resource_text !== null ? (
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                        className="ascendio-home-card-imagen"
                      />
                    ) : (
                      <Card.Img
                        className="CardSinFoto"
                        variant="top"
                        src={
                          "../../../../../public/images/iconos/logoascendio.png"
                        }
                      />
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title>
                      <h3>{traderprofile?.nickname}</h3>
                    </Card.Title>
                    <Card.Text>{elem.description}</Card.Text>
                    <button
                              className="Button3 button-with-ellipsis"
                              onClick={() => {
                                navigate(`/OneTradePost/${elem.post_id}`);
                              }}
                            >
                              COMENTARIOS
                    </button>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <h4 className="alltrades-error-nohaypostsnitrades">
              No hay{" "}
              <span className="alltrades-error-nohaypostsnitrades-hijo">
                General Posts
              </span>{" "}
              disponibles en este momento.
            </h4>
          )}
        </div>
      )}

      {/* tradepost */}
      {show === 2 && (
        <div className="d-flex flex-wrap justify-content-center gap-4">
        {tradesposts !== undefined ? (
          tradesposts.map((elem) => {
            return (
              <Card className="ESTILOCARDGENERAL" key={elem.post_id}>
                <Card.Text className="UserCARD">
                  <div className="avatarCard">
                    {elem?.img_name ? (
                      <img
                        src={`http://localhost:3000/images/users/${user.img}`}
                      />
                    ) : (
                      <p className="letteruser">
                        {traderprofile?.nickname.charAt(0).toUpperCase()}
                      </p>
                    )}
                  </div>
                  <p>{traderprofile.nickname}</p>
                </Card.Text>

                <div className="DivImagenCard">
                  {elem.resource_text !== null ? (
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                      className="ascendio-home-card-imagen"
                    />
                  ) : (
                    <Card.Img
                      className="CardSinFoto"
                      variant="top"
                      src={"../../../../../public/images/iconos/logoascendio.png"}
                    />
                  )}
                </div>
                <Card.Body>
                  <Card.Title>
                    <h3>Trade de {elem.currency}</h3>
                  </Card.Title>

                  <div className="d-flex gap-2">
                    <button
                      className="Button3 button-with-ellipsis"
                      onClick={() => {
                        navigate(`/OneTradePost/${elem.post_id}`);
                      }}
                    >
                      COMENTARIOS
                    </button>
                  </div>

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
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <h4 className="alltrades-error-nohaypostsnitrades">
            No hay{" "}
            <span className="alltrades-error-nohaypostsnitrades-hijo">
              Trade Posts
            </span>{" "}
            disponibles en este momento.
          </h4>
        )}
      </div>
      )}
    </>
  );
};
