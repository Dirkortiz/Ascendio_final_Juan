import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormEdit.scss";

const initialValue = {
  nickname: "",
  name: "",
  lastname: "",
  phonenumber: "",
};

export const FormEdit = ({ user, setUser, setShowForm }) => {
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const [style, setStyle] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  const handleFile = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editUser.phonenumber);
    if (
      !editUser.nickname ||
      !editUser.name ||
      !editUser.lastname ||
      !editUser.password
    ) {
      setMsgError("Los campos obligatorios deben estar rellenos");
      setStyle("EditUserMsgFailure");
    } else {
      const newFormData = new FormData();
      newFormData.append("editUser", JSON.stringify(editUser));
      newFormData.append("file", file);

      axios
        .put("http://localhost:3000/users/edituser", newFormData)
        .then((res) => {
          if (res.data.img) {
            setUser({ ...editUser, img: res.data.img });
            console.log(res.data.img);
          } else {
            setUser(editUser);
            console.log(res);
          }
          setMsgError("Datos actualizados con exito");
          setStyle("EditUserMsgSuccess");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  console.log(editUser);

  return (
    <div className="FormularioDatosUsuario">
      <div className="containerAvatar d-flex">
        <div className="avatar">
          <label htmlFor="fileInput">
            {user?.img ? (
              <img
                src={`http://localhost:3000/images/users/${user?.img}`}
                alt="Avatar"
              />
            ) : (
              <p>{user?.nickname.charAt(0).toUpperCase()}</p>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFile}
          />
        </div>
        <div className="ciculoLapizEditar">
          <img
            className="EditarFotoLapiz"
            src="../../../public/images/iconos/lapiznegro.png"
            alt=""
          />
        </div>
      </div>

      <Form className="FormulariosContainer d-flex flex-column">
        <Form.Group className="mb-3" controlId="formBasicNickName">
          <Form.Label></Form.Label>
          <Form.Control
            maxLength={12}
            name="nickname"
            onChange={handleChange}
            placeholder="Introduce un nombre de usuario"
            value={editUser?.nickname}
            autoComplete="nickname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label></Form.Label>
          <Form.Control
            name="name"
            maxLength={12}
            onChange={handleChange}
            placeholder="Introduce un nombre"
            value={editUser?.name}
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label></Form.Label>
          <Form.Control
            name="lastname"
            maxLength={30}
            onChange={handleChange}
            placeholder="Introduce un apellido"
            value={editUser?.lastname}
            autoComplete="lastname"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhonenumber">
          <Form.Label></Form.Label>
          <Form.Control
            name="phonenumber"
            maxLength={20}
            onChange={handleChange}
            type="text"
            placeholder="Introduce un número de teléfono"
            value={editUser?.phonenumber === null ? "" : editUser?.phonenumber}
          />
        </Form.Group>
        <p className={style}>{msgError || "\u00A0"}</p>
        <div className="DivGrisParaBotones mt-3">
          <button
            className="Button3"
            variant="primary me-2"
            onClick={handleSubmit}
          >
            ACEPTAR
          </button>
          <button className="Button1" onClick={() => setShowForm(false)}>
            CANCELAR
          </button>
        </div>
      </Form>
    </div>
  );
};
