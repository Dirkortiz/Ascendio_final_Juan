import axios from "axios";
import React, { useEffect, useState } from "react";
import { TradeCard } from "../TradeCard/TradeCard";
import { Col } from "react-bootstrap";

export const TradesPostMap = () => {
  const [trades, setTrades] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getposttrades`)
      .then((res) => {
        console.log(res);
        setTrades(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {trades?.map((elem, index) => {
        return (
          <Col className="d-flex justify-content-center" key={elem.post_id} xxl={3} xl={3} lg={4} md={6} sm={12} xs={9}>
            <TradeCard elem={elem} />
          </Col>
        );
      })}
    </>
  );
};
