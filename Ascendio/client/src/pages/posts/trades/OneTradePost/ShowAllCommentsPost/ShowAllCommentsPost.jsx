import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AscendioContext } from "../../../../../context/AscendioContext";
import "./ShowAllCommentsPost.scss";
export const ShowAllCommentsPost = ({ showModal, setShowModal, oneTrade }) => {
  const [showComments, setShowComments] = useState();
  const [update, setUpdate] = useState(false);
  const { post_id } = oneTrade;
  const { user } = useContext(AscendioContext);
  useEffect(() => {
    if (post_id) {
      axios
        .get(`http://localhost:3000/comments/showallcomments/${post_id}`)
        .then((res) => {
          console.log(res);
          setShowComments(res.data.result);
          setUpdate(false);
        })
        .catch((error) => console.log(error));
    }
  }, [update, showModal]);
  const deleteComment = (comment_id) => {
    axios
      .put(`http://localhost:3000/comments/deletecomments/${comment_id}`)
      .then((res) => {
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const monthIndex = parseInt(monthNumber, 10) - 1;
    return monthNames[monthIndex];
  };
  console.log(new Date());
  return (
    <>
      <Row className="showallcommentsposts-padre">
        <Col xxl={12} className="showallcommentsposts-hijo">
          <h3>Comentarios del Post</h3>
        </Col>
        <Col xxl={12} className="showallcommentsposts-hijo2">
          {showComments?.map((elem, index) => {
            const isEven = index % 2 === 0;
            const backgroundColor = isEven ? "lightColor" : "darkColor";
            return (
              <Row
                key={elem.comment_id}
                className={`showallcommentsposts-nieto  ${backgroundColor}`}
              >
                <Col lg={2} xs={2} className="nickname-oneposttrade">
                  <h6>{elem.nickname}:</h6>
                </Col>
                <Col lg={8} xs={8} className="message-oneposttrade">
                  <p>{elem.message}</p>
                </Col>
                <Col lg={1} xs={1} className="date-oneposttrade">
                  <p>
                    {elem.date.slice(11, 16)} {elem.date.slice(8, 10)}-
                    {getMonthName(elem.date.slice(5, 7))}
                  </p>
                </Col>
                <Col lg={1} xs={1} className="botonera-oneposttrade">
                  {user.user_id === elem.user_id && (
                    <Button
                      className="boton-eliminar-comment"
                      onClick={() => {
                        deleteComment(elem.comment_id);
                      }}
                    >
                      <img src="../../../../../../public/images/iconos/papelera.png" alt="" />
                      {/* :x: */}
                    </Button>
                  )}
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col xxl={12} className="showallcommentsposts-hijo3 mt-3">
          <button
            className="Button3"
            onClick={() => {
              setShowModal(true);
            }}
          >
            COMENTAR
          </button>
        </Col>
      </Row>
    </>
  );
};