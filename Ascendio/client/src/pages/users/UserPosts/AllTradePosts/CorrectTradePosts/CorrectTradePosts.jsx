import React, { useContext, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../../../../../public/stylesheets/ButtonsApp.scss";
import "../../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";
import { AscendioContext } from "../../../../../context/AscendioContext";

export const CorrectTradePosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const navigate = useNavigate();
  const {user} = useContext(AscendioContext);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center AllTradesPostGap">
        {posts
          ?.filter((post) => post.type === 2 && post.correct === 1)
          .map((elem) => {
            return (
              <Card className="ESTILOCARDGENERAL" key={elem.post_id}>
                <Card.Text className="UserCARD">
            <div className="avatarCard">
              {user?.img ? (
                <img src={`http://localhost:3000/images/users/${user.img}`} />
              ) : (
                <p className="letteruser">
                  {user?.nickname.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
              <p>{user.nickname}</p></Card.Text>
              <div className="DivImagenCard">
                {elem.resource_text !== null ? (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/images/trades/${elem.resource_text}`}
                  />
                ) : (
                  <Card.Img
                    className="CardSinFoto"
                    variant="top"
                    src={"../../../../public/images/iconos/logoascendio.png"}
                  />
                )}
              </div>
                <Card.Body>
                  <Card.Title>
                    <h3>Trade de {elem.category_name}</h3>
                  </Card.Title>
                  <ListGroup variant="flush">
                    <Card.Text>
                              <p>
                        Currency: <span>{elem.currency}</span>
                      </p>
                      <p>
                        Descripción: <span>{elem.description}</span>
                      </p>
                      <p>
                        Precio de entrada:<span> {elem.entry_price}</span>
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
                    <div className="BotoneraTrades">
                      {elem.correct === null ? (
                        <div className="d-flex gap-1 m-0">
                          <Button
                            className="TradeAcertado"
                            onClick={() =>
                              markACorrect(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/acertadonegro.png"
                              alt=""
                            />
                          </Button>
                          <Button
                            className="TradeErroneo"
                            onClick={() =>
                              markAIncorrect(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/erroneonegro.png"
                              alt=""
                            />
                          </Button>
                        </div>
                      ) : elem.correct === 1 ? (
                        <div className="d-flex gap-1 m-0">
                          <Button
                            className="TradeErroneo"
                            onClick={() =>
                              markAIncorrect(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/erroneonegro.png"
                              alt=""
                            />
                          </Button>
                          <Button
                            className="TradePendiente"
                            onClick={() =>
                              markAPending(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/pendiente.png"
                              alt=""
                            />
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex gap-1 m-0">
                          <Button
                            className="TradeAcertado"
                            onClick={() =>
                              markACorrect(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/acertadonegro.png"
                              alt=""
                            />
                          </Button>
                          <Button
                            className="TradePendiente"
                            onClick={() =>
                              markAPending(elem.post_id, elem.correct)
                            }
                            variant="primary"
                          >
                            <img
                              src="../../../public/images/iconos/pendiente.png"
                              alt=""
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button
                      className="Button3"
                      onClick={() => {
                        navigate(`/oneGeneralPost/${elem.post_id}`);
                      }}
                    >
                      COMENTARIOS
                    </Button>
                  </ListGroup>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};
