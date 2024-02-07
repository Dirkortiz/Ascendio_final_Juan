import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import "./Estadisticas.scss";

export const Estadisticas = () => {
  const [stats, setStats] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/allstatistics`)
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {stats?.map((elem, index) => {
        return (
          <Row className="mt-5">
            <Col xxl={12} className="">
              <Row className="RowStatsAdmin gap-4 justify-content-xl-center justify-content-lg-center">
                <Col
                  key={elem.user_id}
                  xs={12}
                  className="Statsdiv mt-4 text-center"
                >
                  <h5 className="Ptitle">Usuarios</h5>
                  <div>
                    <p className="Psub">Usuarios:</p>
                    <p className="Pstat">{elem.num_type_2_users}</p>
                    <p className="Psub">Usuarios Activos:</p>
                    <p className="Pstat">{elem.num_active_users}</p>
                    <p className="Psub">Usuarios Bloqueados: </p>
                    <p className="Pstat">
                      {elem.num_type_2_users - elem.num_active_users}
                    </p>
                    <p className="Psub">Admins:</p>
                    <p className="Pstat">{elem.num_type_1_users}</p>
                  </div>
                </Col>
                <Col
                  key={elem.post_id}
                  xs={12}
                  className="Statsdiv mt-4 text-center"
                >
                  <h5 className="Ptitle">Posts</h5>
                  <div>
                    <p className="Psub">Posts Totales:</p>
                    <p className="Pstat">{elem.num_posts}</p>
                    <p className="Psub">Trades Publicados:</p>
                    <p className="Pstat">{elem.num_trade_posts}</p>
                    <p className="Psub">Trades Correctos:</p>
                    <p className="Pstat">{elem.num_correct_posts}</p>
                    <p className="Psub">Trades Incorrectos:</p>
                    <p className="Pstat">{elem.num_incorrect_posts}</p>
                    <p className="Psub">Trades Pendientes: </p>
                    <p className="Pstat">
                      {elem.num_trade_posts -
                        elem.num_correct_posts -
                        elem.num_incorrect_posts}
                    </p>
                  </div>
                </Col>
                <Col
                  key={elem.course_id}
                  xs={12}
                  className="Statsdiv mt-4 text-center mb-5"
                >
                  <h5 className="Ptitle">Cursos</h5>
                  <div>
                    <p className="Psub">Cursos Publicados:</p>
                    <p className="Pstat">{elem.num_courses}</p>
                    <p className="Psub">Cursos Activos:</p>
                    <p className="Pstat">{elem.num_active_courses}</p>
                    <p className="Psub">Cursos Bloqueados:</p>
                    <p className="Pstat">{elem.num_disabled_courses}</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </>
  );
};
