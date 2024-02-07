import React from "react";
import "./TradeCard.scss";
import { Col, Row } from "react-bootstrap";

export const TradeCard = ({ elem }) => {
  return (
    <Row className="TradeDiv justify-content-center align-items-center text-center flex-column mt-md-4 mt-sm-4 mt-4">
      <Col>
        <img
          src={
            elem.img != null
              ? `http://localhost:3000/images/users/${elem.img}`
              : `http://localhost:3000/images/users/descarga.png`
          }
          alt="Imagen de perfil del usuario"
        />
          <h5 className="text-center mt-4 mb-4">{elem.nickname}</h5>
        
          <div className="text-start mt-4">
          
            <p>Divisa: {elem.currency}</p>
            <p>Precio de entrada: {elem.entry_price}</p>
            <p>Parar pérdida: {elem.stop_loss}</p>
            <p>Beneficio: {elem.take_profit}</p>
            {elem.correct === null && <p>Estado: Pendiente</p>}
            {elem.correct === 1 && <p>Estado: Acertado</p>}
            {elem.correct === 0 && <p>Estado: Errado</p>}
          </div>
        </Col>
      
    </Row>
  );
};
