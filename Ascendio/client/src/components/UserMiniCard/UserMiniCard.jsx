import React, { useEffect, useState } from "react";
import "./UserMiniCard.scss";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

export const UserMiniCard = ({ elem, updateUsers, setUpdateUsers }) => {
  const activateUser = (id, is_disabled) => {
    let url = `http://localhost:3000/admin/activateuser/${id}`;
    if (is_disabled === 0) {
      url = `http://localhost:3000/admin/disableuser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setUpdateUsers(!updateUsers);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="userMiniCardAdminView flex-wrap d-flex align-items-center justify-content-between gap-xl-4">
      <div className="AdminUserImg">
        <img
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
          <p className="fw-bold">{elem.nickname}</p>
          <p>{elem.total_followers} Seguidores</p>
        </div>
        <div>
          <p>{elem.correct_posts} Acertados</p>
          <p>{elem.incorrect_posts} Errados</p>
        </div>
      </div>
      <div className="AdminUserButton">
        <button
          className="Button4"
          variant="danger"
          onClick={() => activateUser(elem?.user_id, elem?.is_disabled)}
        >
          {elem.is_disabled ? "Activar" : "Desactivar"}
        </button>
      </div>
    </div>
  );
};
