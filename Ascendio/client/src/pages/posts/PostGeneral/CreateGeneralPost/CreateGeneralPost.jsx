import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../context/AscendioContext";
import axios from "axios";
import "./CreateGeneralPost.scss";

const initialValue = {
  description: "",
};

export const CreateGeneralPost = () => {
  const [generalPost, setGeneralPost] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const [options, setOptions] = useState([]);
  const { user, setUser } = useContext(AscendioContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralPost({ ...generalPost, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!generalPost.description || generalPost.description === "") {
      setMsgError("Descripción vacía");
    } else {
      const newFormData = new FormData();
      let data = { ...generalPost, user_id: user.user_id };
      newFormData.append("crearPostGeneral", JSON.stringify(data));
      newFormData.append("file", file);
      axios
        .post("http://localhost:3000/posts/createpostgeneral", newFormData)
        .then((res) => {
          if (res && res.status >= 200 && res.status < 300) {
            navigate("/profile");
          } else {
            // Si la respuesta no es exitosa, puedes manejar el error aquí
            console.error("Error en la solicitud:", res);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Row className="CreateGeneralPostUser justify-content-center">
      <Col xl={6}>
        <Form className="FormulariosContainer">
          <Form.Group controlId="formFile" className="mb-3">      
            <div className="Button3 ButtonImgCreateTradeInput">
              <Form.Label>
                <img
                  className="BotonFoto"
                  src="../../../../../public/images/iconos/camara.png"
                  alt=""
                />
              </Form.Label>
            </div>
            <Form.Control type="file" onChange={handleFile} hidden />
          </Form.Group>
          <Form.Control
            type="text"
            placeholder="Exprésate"
            name="description"
            value={generalPost.description}
            onChange={handleChange}
            required
          />
          <p>{msgError}</p>
          <br />
          <button
            className="Button3 ButtonsCreateTradeSpacing ButtonAcceptCancelCreateTrade"
            onClick={handleSubmit}
          >
            ACEPTAR
          </button>
          <button
            className="Button1 ButtonAcceptCancelCreateTrade"
            onClick={() => navigate("/profile")}
          >
            CANCELAR
          </button>
        </Form>
      </Col>
    </Row>
  );
};
