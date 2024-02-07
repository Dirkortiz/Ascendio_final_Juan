import React, { useEffect, useState } from "react";
import "./AdminHome.scss";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AdminAllUsers } from "../../../components/AdminAllUsers/AdminAllUsers";
import { Estadisticas } from "../AdminEstadisticas/Estadisticas";
import { OneComment } from "../../../components/OneComment/OneComment";
import { AdminDisabledUsers } from "../../../components/AdminDisabledUsers/AdminDisabledUsers";
import { AdminActivateUser } from "../../../components/AdminActivateUser/AdminActivateUser";
import { AdminCourses } from "../../../components/AdminCourses/AdminCourses";
import { DisabledCoursesMap } from "../../../components/DisabledCoursesMap/DisabledCoursesMap";
import { EnabledCoursesMap } from "../../../components/EnabledCoursesMap/EnabledCoursesMap";
import { TradesPostMap } from "../../../components/TradesPostMap/TradesPostMap";

export const AdminHome = () => {
  const [showUserButtons, setShowUserButtons] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showDisabledUsers, setShowDisabledUsers] = useState(false);
  const [showActivatedUsers, setShowActivatedUsers] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showTrades, setShowTrades] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showCourseButtons, setShowCourseButtons] = useState(false);
  const [showDisabledCourses, setShowDisabledCourses] = useState(false);
  const [showEnabledCourses, setShowEnabledCourses] = useState(false);
  const [allUsers, setAllUsers] = useState();

  const showButtons = () => {
    setShowUserButtons(!showUserButtons);
    setShowCourseButtons(false);
    setShowTrades(false);
    setShowStats(false);
    setShowPost(false);
    setShowComments(false);
  };

  const showAllCourseButtons = () => {
    setShowCourseButtons(!showCourseButtons);
    setShowUserButtons(false);
    setShowTrades(false);
    setShowStats(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllUsers = () => {
    setShowUsers(!showUsers);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllDisabledUsers = () => {
    setShowDisabledUsers(!showDisabledUsers);
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowActivatedUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllActivatedUsers = () => {
    setShowActivatedUsers(!showActivatedUsers);
    setShowUsers(false);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowDisabledUsers(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showStatistics = () => {
    setShowStats(!showStats);
    setShowUsers(false);
    setShowTrades(false);
    setShowCourses(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllCourses = () => {
    setShowCourses(!showCourses);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllDisabledCourses = () => {
    setShowDisabledCourses(!showDisabledCourses);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllEnabledCourses = () => {
    setShowEnabledCourses(!showEnabledCourses);
    setShowCourses(false);
    setShowStats(false);
    setShowTrades(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowDisabledCourses(false);
    setShowComments(false);
    setShowPost(false);
  };

  const showAllTrades = () => {
    setShowTrades(!showTrades);
    setShowStats(false);
    setShowCourses(false);
    setShowUsers(false);
    setShowDisabledUsers(false);
    setShowActivatedUsers(false);
    setShowUserButtons(false);
    setShowEnabledCourses(false);
    setShowDisabledCourses(false);
    setShowCourseButtons(false);
  };

  const showAllComments = () => {
    setShowComments(!showComments);
    setShowPost(false);
  };

  const showAllPosts = () => {
    setShowPost(!showPost);
    setShowComments(false);
  };

  return (
    <main className="AdminRow">
      <Row>
        <Col xxl={3} xs={12} className="mt-5">
          <Row>
            <Col
              className="d-flex justify-content-center justify-content-xl-start"
              xs={12}
            >
              <h3 className="text-start mb-5 AscendioColor">Administrador</h3>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4"
              xxl={12}
              lg={3}
              sm={6}
              xs={12}
            >
              <Button className="Button5" onClick={() => showButtons()}>
                Usuarios
              </Button>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-xl-start ButtonsRow"
              xxl={12}
              lg={3}
              sm={6}
              xs={12}
            >
              <Button
                className="Button5 mb-4"
                onClick={() => showAllCourseButtons()}
              >
                Cursos
              </Button>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4"
              xxl={12}
              lg={3}
              sm={6}
              xs={12}
            >
              <Button className="Button5" onClick={() => showStatistics()}>
                Estadisticas
              </Button>
            </Col>
            <Col
              className="d-flex justify-content-center justify-content-xl-start ButtonsRow mb-4"
              xxl={12}
              lg={3}
              sm={6}
              xs={12}
            >
              <Button className="Button5" onClick={() => showAllTrades()}>
                Trades
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xxl={9} xs={12}>
          <>
            {showTrades && (
              <Row className="TradeButtonsRow text-center justify-content-center row-gap-4 mt-5">
                <Col
                  xl={6}
                  xs={12}
                  className="d-flex justify-content-center mb-4 gap-5"
                >
                  <Button className="Button4" onClick={() => showAllPosts()}>
                    Trades
                  </Button>
                  <Button className="Button4" onClick={() => showAllComments()}>
                    General
                  </Button>
                </Col>
              </Row>
            )}
          </>

          <Row className="gap-xxl-4 justify-content-center">{showPost && <TradesPostMap />}</Row>
          <Row className="justify-content-center">
            {showComments && <OneComment />}
          </Row>

          {showUserButtons === true && (
            <>
              <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center mb-5">
                <Col
                  xl={12}
                  xs={4}
                  className="d-flex flex-column flex-sm-row justify-content-center mt-5"
                >
                  <Button className="ButtonNoBG" onClick={() => showAllUsers()}>
                    Todos
                  </Button>

                  <Button
                    className="ButtonNoBG"
                    onClick={() => showAllActivatedUsers()}
                  >
                    Activos
                  </Button>

                  <Button
                    className="ButtonNoBG"
                    onClick={() => showAllDisabledUsers()}
                  >
                    Bloqueados
                  </Button>
                </Col>
              </Row>
              <Row className="row-gap-4">
                {showUsers === true && (
                  <AdminAllUsers
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                )}
                {showDisabledUsers === true && <AdminDisabledUsers />}
                {showActivatedUsers === true && <AdminActivateUser />}
              </Row>
            </>
          )}

          <>{showStats === true && <Estadisticas />}</>

          {showCourseButtons && (
            <>
            {/* Aquí empiezan los cursos */}
            <Row className="ButtonsRow2 d-flex justify-content-center align-items-center text-center mb-5">
                <Col xl={12} xs={4} className="d-flex flex-column flex-sm-row justify-content-center mt-5">
                  <button
                    className="ButtonNoBG"
                    onClick={() => showAllCourses()}
                  >
                    Todos
                  </button>
                  <button
                    className="ButtonNoBG"
                    onClick={() => showAllEnabledCourses()}
                  >
                    Activos
                  </button>
                  <button
                    className="ButtonNoBG"
                    onClick={() => showAllDisabledCourses()}
                  >
                    Bloqueados
                  </button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                  {showCourses && <AdminCourses />}
                  {showDisabledCourses && <DisabledCoursesMap />}
                  {showEnabledCourses && <EnabledCoursesMap />}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </main>
  );
};
