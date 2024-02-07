import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import "../Landing/Landing.scss";
import { TradingViewWidget } from "./TradingViewWidget/TradingViewWidget";

export const Landing = () => {
  return (
    <>
      <main className="ascendio-landing-main-padre">
        <Row className="ascendio-landing-main-hijo-1">
          <Col xs={12} className="ascendio-landing-main-hijo1-nieto">
            <img
              className="ascendio-landing-fondo-principal1"
              src="/images/landing/fondo.png"
              alt=""
            />
          </Col>
          <Col xs={12} className="ascendio-landing-main-hijo1-nieto">
            <img
              src="/images/landing/fondo2.png"
              alt=""
              className="ascendio-landing-fondo-principal2"
            />
          </Col>
        </Row>
        <Row className="ascendio-landing-main-hijo-2">
          <Col xs={12} className="ascendio-landing-main-hijo2-nieto ">
            <Row className="ascendio-landing-main-hijo2-nieto-bisnieto ">
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/icono-movil.png"
                  alt="Imagen de un movil"
                />
                <h6>Multiplataforma</h6>
                <p>Sigue a tus trades favoritos desde cualquier dispositivo.</p>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/iconoChat.png"
                  alt="Imagen de un movil"
                />
                <h6>Canales públicos</h6>
                <p>Canales grauitos y de pago, todos a un solo click.</p>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/iconoEstadisticas.png"
                  alt="Imagen de un movil"
                />
                <h6>Estadísticas</h6>
                <p>Estadísticas verificadas por nuestro equipo.</p>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/historial.png"
                  alt="Imagen de un movil"
                />
                <h6>Historial</h6>
                <p>De todas las operaciones realizadas por nuestros trades.</p>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/timbre.png"
                  alt="Imagen de un movil"
                />
                <h6>Notificaciones</h6>
                <p>Notificaciones completamente personalizables.</p>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                className="ascendio-landing-main-hijo2-nieto-bisnieto-tataranieto"
              >
                <img
                  src="/images/landing/ranking.png"
                  alt="Imagen de un movil"
                />
                <h6>Rankings</h6>
                <p>Rankings ajustados y actualizados al minuto.</p>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="ascendio-landing-main-hijo2-nieto">
            <TradingViewWidget />
          </Col>
        </Row>
      </main>
      <footer>
        <Row className="ascendio-landing-footer-padre">
          <Col xs={5} className="ascendio-landing-footer-padre-hijo">
            <h3>ASCENDIO</h3>
          </Col>
          <Col xs={2} className="ascendio-landing-footer-padre-hijo">
            <p>&copy;2024 Ascendio, inc</p>
          </Col>
          <Col xs={2} className="ascendio-landing-footer-padre-hijo">
            <Link
              className="ascendio-landing-footer-link "
              to="/termsandconditions"
            >
              Therms & Conditions
            </Link>
          </Col>
          <Col xs={1} className="ascendio-landing-footer-padre-hijo">
            <Link className="ascendio-landing-footer-link" to="/privacy">
              Privacy
            </Link>
          </Col>
          <Col xs={2} className="ascendio-landing-footer-padre-hijo">
            <Link className="ascendio-landing-footer-link" to="/cookiespolicy">
              Cookies Policy
            </Link>
          </Col>
        </Row>
      </footer>
    </>
  );
};
