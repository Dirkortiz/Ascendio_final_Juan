import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentCard } from "../Comment/CommentCard";
import { Col } from "react-bootstrap";

export const OneComment = () => {
  const [generalPost, setGeneralPost] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getgeneralposts`)
      .then((res) => {
        setGeneralPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {generalPost?.map((elem) => {
        return (
          <Col xxl={12} xl={9} lg={9} md={9} sm={9} xs={9} key={elem.post_id}>
            <CommentCard elem={elem} />
          </Col>
        );
      })}
    </>
  );
};
