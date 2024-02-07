import React, { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AllPosts.scss";
import "../../../../../../client/public/stylesheets/ButtonsApp.scss";
import "../../../../../../client/public/stylesheets/ESTILOCARDGENERAL.scss";
import { AscendioContext } from "../../../../context/AscendioContext";

export const AllPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const { user } = useContext(AscendioContext);
  console.log(user);

  const navigate = useNavigate();

  return (
    <div className=" AllPostsScss d-flex justify-content-center flex-wrap">
      {posts?.map((elem) => {
        return (
          <Card className="ESTILOCARDGENERAL mb-4" key={elem.post_id}>
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
              {elem.resource_text === null ? (
                <Card.Img
                  className="CardSinFoto"
                  variant="top"
                  src={"../../../../public/images/iconos/logoascendio.png"}
                />
              ) : (
                <Card.Img
                  variant="top"
                  src={
                    elem.type === 2
                      ? `http://localhost:3000/images/trades/${elem.resource_text}`
                      : `http://localhost:3000/images/generalpost/${elem.resource_text}`
                  }
                />
              )}
            </div>
            {elem.type === 2 ? (
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h3>Trade de {elem.category_name}</h3>{" "}
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
                    <span>{elem.correct === null && "trade pendiente"}</span>
                    <span>
                      {elem.correct === 0 && "trade errado"}
                      {elem.correct === 1 && "trade acertado"}
                    </span>
                  </p>
                </Card.Text>
                <div className="d-flex">
                  <Button
                    className="Button3"
                    onClick={() => {
                      navigate(`/onetradepost/${elem.post_id}`);
                    }}
                  >
                    COMENTARIOS
                  </Button>
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
                      <>
                        <div>
                          <div className="d-flex gap-1 mb-0">
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
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h3>{elem.category_name} Post</h3>{" "}
                </Card.Title>
                <Card.Text>
                  {elem.currency !== null ? (
                    <p>Currency: {elem.currency}</p>
                  ) : null}
                  <p>Descripción: {elem.description}</p>
                </Card.Text>
                <Button
                  className="Button3"
                  onClick={() => {
                    navigate(`/onegeneralpost/${elem.post_id}`);
                  }}
                >
                  COMENTARIOS
                </Button>
              </Card.Body>
            )}
          </Card>
        );
      })}
    </div>
  );
};
