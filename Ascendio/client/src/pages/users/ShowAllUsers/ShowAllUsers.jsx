import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AscendioContext } from "../../../context/AscendioContext";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./showallusers.scss";
import "../../../../public/stylesheets/ButtonsApp.scss";

export const ShowAllUsers = () => {
  const [show, setShow] = useState(1);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [statisticsUser, setStatisticsUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allUsersFilter, setAllUsersFilter] = useState();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState("nickname");
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/statisticsuser/${user.user_id}`)
      .then((res) => {
        // console.log("datos del usuario", res.data);
        setStatisticsUser(res.data.datos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    if (show === 1) {
      axios
        .get(`http://localhost:3000/users/showallusers`)
        .then((res) => {
          // console.log(res);
          setAllUsers(res.data.filter((elem) => elem.type === 2));
          setAllUsersFilter(res.data.filter((elem) => elem.type === 2));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (show === 2) {
      axios
        .get(`http://localhost:3000/users/showalluserssuccesses`)
        .then((res) => {
          setAllUsers(res.data.filter((elem) => elem.type === 2));
          setAllUsersFilter(res.data.filter((elem) => elem.type === 2));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [followingUsers, user, show]);

  user &&
    useEffect(() => {
      const user_id = user.user_id;
      axios
        .get(`http://localhost:3000/users/getfollowuser/${user_id}`)
        .then((res) => {
          // console.log(res.data);
          // esto permite que al recargar me cargue el estado followingUsers con los usuarios a los que seguimos
          setFollowingUsers(res.data.map((user) => user.followed_user_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }, [user]);

  const pulsarSeguirONo = (id_followed) => {
    const data = [user.user_id, id_followed];
    const isFollowing = followingUsers.includes(id_followed); // devuelve true o false

    if (isFollowing) {
      // Dejar de seguir
      axios
        .delete(`http://localhost:3000/users/unfollowUser`, { data })
        .then((res) => {
          // console.log(res.data);
          setFollowingUsers((prevFollowingUsers) =>
            prevFollowingUsers.filter((userId) => userId !== id_followed)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Seguir
      axios
        .post(`http://localhost:3000/users/followUser`, data)
        .then((res) => {
          // setFollowingUsers([...followingUsers, id_followed]);
          setFollowingUsers((prevFollowingUsers) => [
            ...prevFollowingUsers,
            id_followed,
          ]);
          // console.log([...followingUsers, id_followed]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const searchFilter = e.target.value;
    setSearch(searchFilter);
    if (search !== "") {
      setAllUsersFilter(
        allUsers.filter((patata) =>
          patata[options].toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    } else {
      setLastTradesFilter(allUsers);
    }
  };

  // console.log(options);
  // let ratioTotal = 0;
  // if (statisticsUser?.num_correct_posts !== 0) {
  //   ratioTotal =
  //     parseFloat(
  //       statisticsUser?.num_correct_posts / statisticsUser?.num_trades
  //     ) * 100;
  // }

  let ratioTotal = 0;
  if (statisticsUser?.num_correct_posts !== 0) {
    ratioTotal =
      parseFloat(
        statisticsUser?.num_correct_posts / statisticsUser?.num_trades
      ) * 100;
  }
  return (
    <div className="ShowAllUserPaddings2-10">
      {show === 1 && (
        <>
          <Row>
            <Col>
              <Row className="d-flex RowShowAllUsersHeader">
                <Col>
                  <button className="mb-2 Button1" onClick={() => setShow(2)}>
                    USUARIOS CON MÁS ACIERTOS
                  </button>
                </Col>
                <Col>
                  <div className="input-container BuscadorShowAllUsers">
                    <input
                      className="buscador"
                      onChange={handleChange}
                      placeholder="🔍..."
                      value={search}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center flex-column mt-4"
            >
              <Row className="row-gap-4">
                {allUsersFilter?.map((elem) => {
                  return (
                    <Col
                      xs={12}
                      key={elem.user_id}
                      className="d-flex justify-content-center"
                    >
                      <Col className="cards-showuser flex-wrap d-flex align-items-center justify-content-between gap-xl-4 flex-xs-row">
                        <div>
                          <img
                            className="userImg"
                            src={
                              elem.img != null
                                ? `http://localhost:3000/images/users/${elem.img}`
                                : `http://localhost:3000/images/users/descarga.png`
                            }
                            alt="Imagen de perfil del usuario"
                          />
                        </div>
                        <div className="AdminUserStats d-flex justify-content-center justify-content-xl-start gap-2 gap-xl-3">
                          <div>
                            <p className="fw-bold">
                              <Link
                                className="home-link-traders"
                                to={`http://localhost:5173/traderprofile/${elem.user_id}`}
                              >
                                {elem.nickname}
                              </Link>
                            </p>
                            <p>{elem.followers_count} Seguidores</p>
                            <p>
                              Fiabilidad: {parseFloat(ratioTotal.toFixed(2))} %
                            </p>
                          </div>
                        </div>
                        <div className="DivBotonesShowAllUsers d-flex flex-column gap-2">
                          {user.user_id !== elem.user_id ? (
                            <button
                              className="Button3"
                              onClick={() => pulsarSeguirONo(elem.user_id)}
                            >
                              {followingUsers.includes(elem.user_id)
                                ? "Siguiendo"
                                : "Seguir"}
                            </button>
                          ) : null}
                        </div>
                      </Col>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </>
      )}
      {show === 2 && (
        <>
          <Row>
            <Col>
              <Row className="d-flex RowShowAllUsersHeader">
                <Col>
                  <button className="mb-2 Button1" onClick={() => setShow(1)}>
                    USUARIOS CON MÁS SEGUIDORES
                  </button>
                </Col>
                <Col>
                  <div className="input-container BuscadorShowAllUsers">
                    <input
                      className="buscador"
                      onChange={handleChange}
                      placeholder="🔍..."
                      value={search}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center flex-column mt-4"
            >
              <Row className="row-gap-4">
                {allUsersFilter?.map((elem) => {
                  return (
                    <Col
                      xs={12}
                      key={elem.user_id}
                      className="d-flex justify-content-center"
                    >
                      <Col
                        key={elem.user_id}
                        className="cards-showuser flex-wrap d-flex align-items-center justify-content-between gap-xl-4 flex-xs-row"
                      >
                        <div>
                          <img
                            className="userImg"
                            src={
                              elem.img != null
                                ? `http://localhost:3000/images/users/${elem.img}`
                                : `http://localhost:3000/images/users/descarga.png`
                            }
                            alt="Imagen de perfil del usuario"
                          />
                        </div>
                        <div className="AdminUserStats d-flex justify-content-center justify-content-xl-start gap-2 gap-xl-3">
                          <div>
                            <p className="fw-bold">
                              <Link
                                className="home-link-traders"
                                to={`http://localhost:5173/traderprofile/${elem.user_id}`}
                              >
                                {elem.nickname}
                              </Link>
                            </p>
                            <p>{elem.followers_count} Seguidores</p>
                          </div>

                          <div>
                            <p>{elem.correct_posts} Acertados</p>
                            <p>{elem.incorrect_posts} Errados</p>
                          </div>
                        </div>
                        <div className="DivBotonesShowAllUsers d-flex flex-column gap-2">
                          {user.user_id !== elem.user_id ? (
                            <button
                              className="Button3"
                              onClick={() => pulsarSeguirONo(elem.user_id)}
                            >
                              {followingUsers.includes(elem.user_id)
                                ? "Siguiendo"
                                : "Seguir"}
                            </button>
                          ) : null}
                        </div>
                      </Col>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};
