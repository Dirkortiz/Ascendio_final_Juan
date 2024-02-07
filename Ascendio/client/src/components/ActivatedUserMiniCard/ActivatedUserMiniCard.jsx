import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./ActivatedUserMiniCard.scss";

export const ActivatedUserMiniCard = ({ elem, update, setUpdate }) => {
  const disableUser = (id) => {
    axios
      .put(`http://localhost:3000/admin/disableuser/${id}`)
      .then((res) => {
        console.log(res);
        setUpdate(true);
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
          variant="danger"
          className="Button4"
          onClick={() => disableUser(elem.user_id)}
        >
          Desactivar
        </button>
      </div>
    </div>
  );
};
