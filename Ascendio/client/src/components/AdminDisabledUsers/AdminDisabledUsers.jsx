import axios from "axios";
import React, { useEffect, useState } from "react";
import { DisabledUserCard } from "../DisabledUserMiniCard/DisabledUserCard";
import { Col, Container, Row } from "react-bootstrap";
import "./AdminDisabledUsers.scss";

export const AdminDisabledUsers = () => {
  const [disabledUsers, setDisabledUsers] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/admindisabledallusers")
      .then((res) => {
        console.log(res);
        setDisabledUsers(res.data);
        setUpdate(false);
      })
      .catch((err) => console.log(err));
  }, [update]);

  return (
    <>
      {disabledUsers?.map((elem) => (
        <Col
          className="d-flex justify-content-center"
          key={elem.user_id}
          xs={12}
        >
          <DisabledUserCard elem={elem} update={update} setUpdate={setUpdate} />
        </Col>
      ))}
    </>
  );
};
