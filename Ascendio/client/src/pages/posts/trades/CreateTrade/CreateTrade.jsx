import React, { useContext, useEffect, useState } from "react";
import "./createTrade.scss";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../../context/AscendioContext";
import axios from "axios";
import Select from "react-select";
import "../../../../../public/stylesheets/InputDesplegableSinBootstrap.scss";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e0e0" : "$accent5-color",
    color: state.isFocused ? "$accent-color" : "black",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "25px",
    height: "45.96px",
    padding: "10px",
    boxShadow: state.isFocused ? `0 0 0 0.25rem $accent-color` : "none",
  }),
};

const initialValue = {
  currency: "",
  description: "",
  entryPrice: "",
  stopLoss: "",
  takeProfit: "",
  category_id: "",
};

export const CreateTrade = () => {
  const [createOneTrade, setCreateOneTrade] = useState(initialValue);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const { user, setUser } = useContext(AscendioContext);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/callcategorys")
      .then((res) => {
        setOptions(
          res.data.map((elem) => ({
            value: elem.category_id,
            label: elem.category_name,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateOneTrade({ ...createOneTrade, [name]: value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !createOneTrade.currency ||
      !createOneTrade.description ||
      !createOneTrade.entryPrice ||
      !createOneTrade.stopLoss ||
      !createOneTrade.takeProfit ||
      !createOneTrade.category_id
    ) {
      setMsgError("Por favor, completa todos los campos");
    } else if (
      isNaN(parseInt(createOneTrade.stopLoss)) ||
      isNaN(parseInt(createOneTrade.takeProfit)) ||
      isNaN(parseInt(createOneTrade.entryPrice))
    ) {
      setMsgError("Los ultimos tres campos, solo admiten numeros");
    } else {
      const newFormData = new FormData();
      let data = { ...createOneTrade, user_id: user.user_id };
      // console.log(data); me hace bien el data
      newFormData.append("crearTrade", JSON.stringify(data));
      newFormData.append("file", file);
      axios
        .post("http://localhost:3000/posts/createtrade", newFormData)
        .then((res) => {
          if (res.data.img) {
            setCreateOneTrade({ ...createOneTrade, img: res.data.img });
            navigate("/profile");
          } else {
            setCreateOneTrade(createOneTrade);
            navigate("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#e0e0e0" : "$accent5-color",
        color: state.isFocused ? "$accent-color" : "black",
      }),
      control: (provided, state) => ({
        ...provided,
        border: "1px solid #ccc",
        borderRadius: "25px",
        height: "45.96px",
        padding: "10px",
        boxShadow: state.isFocused ? `0 0 0 0.25rem $accent-color` : "none",
      }),
    };

  };
  return (
    <Row className="CreateTradeUser justify-content-center">
      <Col xl={6}>
        <Form className="FormulariosContainer d-flex flex-column">
          <Form.Group controlId="formFile" className="mb-3">
            <div className="Button3 ButtonImgCreateTradeInput">
              <Form.Label>
                {" "}
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
            placeholder="Escribir la moneda o acción"
            name="currency"
            value={createOneTrade.currency}
            onChange={handleChange}
            required
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Descripción"
            name="description"
            value={createOneTrade.description}
            onChange={handleChange}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Precio de entrada"
            name="entryPrice"
            value={createOneTrade.entryPrice}
            onChange={handleChange}
            required
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Stop Loss"
            name="stopLoss"
            value={createOneTrade.stopLoss}
            onChange={handleChange}
            required
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Take Profit"
            name="takeProfit"
            value={createOneTrade.takeProfit}
            onChange={handleChange}
            required
          />
          <br />
          <select
            className="InputDesplegableSinBootstrap textIndentPlaceholder "
            placeholder="Categoría.."
            id="category"
            name="category_id"
            value={createOneTrade.category_id}
            onChange={handleChange}
          >
            <option value="" className="optionesvariety"></option>
            {options
              .filter((elem) => elem.label !== "General")
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          <p>{msgError}</p>
          <br />
          <div>
            <button
              className="Button3 ButtonsCreateTradeSpacing"
              onClick={handleSubmit}
            >
              ACEPTAR
            </button>
            <button className="Button1" onClick={() => navigate("/profile")}>
              CANCELAR
            </button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
