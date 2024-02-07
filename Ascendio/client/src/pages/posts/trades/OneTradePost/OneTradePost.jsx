import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "./ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "./ShowAllCommentsPost/ShowAllCommentsPost";
import "./oneTradePost.scss";
// import "../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";
export const OneTradePost = () => {
  const [oneTrade, setOneTrade] = useState();
  const [showModal, setShowModal] = useState(false);
  const post = useParams();
  console.log(post);
  const navigate = useNavigate();
  useEffect(() => {
    if (post) {
      axios
        .get(`http://localhost:3000/posts/onetradepost/${post.post_id}`)
        .then((res) => {
          console.log(res);
          setOneTrade(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [post]);
  console.log(oneTrade);
  return (
    <>
      {oneTrade && (
        <Row className="onetradepost">
          <Col xs={12} xl={3} xxl={3} className="onetradepost-hijo">
            <Card className="card-padre-onetradepost">
              <Col className="UserCARD card-hijo1-onetradepost">
                <button
                  className="Button1"
                  onClick={() => navigate("/allpoststrades")}
                  variant="primary"
                >
                  Volver
                </button>
                <h3 className="nickname-card-onetradepost">
                  <Link to={`/traderprofile/${oneTrade.user_id}`}>
                    {oneTrade.post_user_nickname.charAt(0).toUpperCase() +
                      oneTrade.post_user_nickname.slice(1).toLowerCase()}
                  </Link>
                </h3>
              </Col>
              <Col className="card-hijo2-onetradepost">
                <div className="DivImagenCard">
                  {oneTrade.resource_text !== null ? (
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3000/images/trades/${oneTrade.resource_text}`}
                      className="ascendio-home-card-imagen"
                    />
                  ) : (
                    <Card.Img
                      className="CardSinFoto"
                      variant="top"
                      src={"../../../../public/images/iconos/logoascendio.png"}
                    />
                  )}
                </div>
                <Card.Body className="card-nieto-onetradpost">
                  <p>
                    Categoría: <span>{oneTrade.category_name}</span>
                  </p>
                  <p>
                    Currency: <span>{oneTrade.currency}</span>
                  </p>
                  <p>
                    Precio de entrada: <span>{oneTrade.entry_price}</span>
                  </p>
                  <p>
                    Precio de stop: <span>{oneTrade.stop_loss}</span>
                  </p>
                  <p>
                    Precio Profit: <span>{oneTrade.take_profit}</span>
                  </p>
                  <p>
                    Descripción: <span>{oneTrade.description}</span>
                  </p>
                </Card.Body>
              </Col>
              <Col className="card-hijo3-onetradepost">
                <h4
                  className={
                    oneTrade.correct === null
                      ? "h4-white-pending"
                      : oneTrade.correct === 1
                      ? "h4-green-correct"
                      : "h4-red-incorrect"
                  }
                >
                  {oneTrade.correct === null
                    ? "Trade Pediente"
                    : oneTrade.correct === 1
                    ? "Trade Acertado"
                    : "Trade Fallido"}
                </h4>
              </Col>
            </Card>
          </Col>
          <Col
            xs={12}
            xl={9}
            xxl={9}
            className="onetradepost-hijo d-flex justify-content-center"
          >
            <ShowAllCommentsPost
              showModal={showModal}
              setShowModal={setShowModal}
              oneTrade={oneTrade}
            />
          </Col>
          <Col xs={12}>
            {showModal && (
              <ModalCreateComment
                showModal={showModal}
                setShowModal={setShowModal}
                oneTrade={oneTrade}
              />
            )}
          </Col>{" "}
        </Row>
      )}
    </>
  );
};
