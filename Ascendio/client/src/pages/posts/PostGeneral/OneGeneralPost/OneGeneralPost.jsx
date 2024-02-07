import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalCreateComment } from "../../trades/OneTradePost/ModalCreateComment/ModalCreateComment";
import { ShowAllCommentsPost } from "../../trades/OneTradePost/ShowAllCommentsPost/ShowAllCommentsPost";
import "./OneGeneralPost.scss";
export const OneGeneralPost = () => {
  const [oneTrade, setOneTrade] = useState();
  const [showModal, setShowModal] = useState(false);
  const post = useParams();
  // console.log(post);
  const navigate = useNavigate();
  if (post) {
    useEffect(() => {
      axios
        .get(
          `http://localhost:3000/posts/onetradepost/${post.post_id}`
        ) /* cambiar */
        .then((res) => {
          setOneTrade(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [post]);
  }
  // console.log(oneTrade);
  return (
    <>
      {oneTrade && (
        <Row className="onetradepost">
          <Col xs={12} xl={3} xxl={3}>
            <Card className="card-padre-onetradepost">
              <Col className="UserCARD card-hijo1-onetradepost">
                <button
                  className="Button1"
                  onClick={() => navigate("/allpostsgenerals")}
                  variant="primary"
                >
                  VOLVER
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
                      src={`http://localhost:3000/images/generalPost/${oneTrade.resource_text}`}
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
                    Descripción: <span>{oneTrade.description}</span>
                  </p>
                </Card.Body>
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
