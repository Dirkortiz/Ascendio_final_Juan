import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import "./EditUser.scss";
import "../../../../public/stylesheets/ButtonsApp.scss";
import "../../../../public/stylesheets/FormulariosEInputs.scss";
import "../../../../public/stylesheets/InputDesplegableApp.scss";
import { FormEdit } from "./EditUserData/FormEdit";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import { DeleteUser } from "./DeleteUser/DeleteUser";
import axios from "axios";
import Select from "react-select";
import "../../../../public/stylesheets/InputDesplegableSinBootstrap.scss";

export const EditUser = () => {
  const { user, setUser } = useContext(AscendioContext);
  const [showForm, setShowForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [categories, setCategories] = useState(false);
  const [userCategory, setUserCategory] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState();
  const [style, setStyle] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/getcategories`)
      .then((res) => {
        // console.log(res);
        setOptions(
          res.data.map((elem) => ({
            value: elem.category_id,
            label: elem.category_name,
            key: elem.category_id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    useEffect(() => {
      user &&
        axios
          .get(`http://localhost:3000/users/getcategoriesuser/${user.user_id}`)
          .then((res) => {
            // console.log(res);
            setUserCategory(res.data);
            setCategories(false);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [categories]);
  }
  // if (userCategory) {
  //   console.log(userCategory);
  // }

  const handleOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedValues = selectedOption.map((option) => option.value);

    axios
      .post(
        `http://localhost:3000/users/usersendcategory`,
        { user_id: user.user_id, selectedValues } /* newFormData */
      )
      .then((res) => {
        // console.log(res.data);
        setCategories(true);
        setMsgSuccess("Categorías cambiadas con éxito");
        setStyle("EditUserMsgSuccess");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const verSection = () => {
    setShowForm(!showForm);
    setShowChangePassword(false);
    setShowDeleteUser(false);
    setShowCategories(false);
  };

  const verChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    setShowForm(false);
    setShowDeleteUser(false);
    setShowCategories(false);
  };

  const verDeleteUser = () => {
    setShowDeleteUser(!showDeleteUser);
    setShowForm(false);
    setShowChangePassword(false);
    setShowCategories(false);
  };

  const verCategoryUser = () => {
    setShowCategories(!showCategories);
    setShowForm(false);
    setShowChangePassword(false);
    setShowDeleteUser(false);
  };

  const categoryMapping = {
    1: "Actions",
    2: "Crypto",
    3: "Forex",
    4: "General",
  };

  return (
    <main>
      <Row className="EditUserApp w-30 s-xs-90">
        <Col xs={12} sm={12} md={12} lg={12} xl={6} className="p-0">
          <Button
            className="Button5 ButtonEditUser1 InputsMinimumWidthEditUser mb-4 mt-4"
            onClick={verSection}
          >
            EDITAR DATOS DEL USUARIO
          </Button>
          <Button
            className="Button5 ButtonEditUser1 InputsMinimumWidthEditUser mb-4"
            onClick={verCategoryUser}
          >
            {" "}
            EDITAR CATEGORÍA{" "}
          </Button>
          <Button
            className="Button5 ButtonEditUser1 InputsMinimumWidthEditUser mb-4"
            onClick={verChangePassword}
          >
            EDITAR DATOS DE LOGIN{" "}
          </Button>
          <Button
            className="Button5 ButtonEditUser1 InputsMinimumWidthEditUser mb-4"
            onClick={verDeleteUser}
          >
            ELIMINAR CUENTA{" "}
          </Button>
        </Col>

        <Col
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="p-0 justify-content-lx-center align-items-xxl-center"
        >
          {showForm && (
            <FormEdit setShowForm={setShowForm} user={user} setUser={setUser} />
          )}
          {showChangePassword && (
            <ChangePassword
              setShowChangePassword={setShowChangePassword}
              user={user}
              setUser={setUser}
            />
          )}
          {showDeleteUser && (
            <DeleteUser
              setShowDeleteUser={setShowDeleteUser}
              user={user}
              setUser={setUser}
            />
          )}
          {showCategories && (
            <Form onSubmit={handleSubmit} className=" FormularioDatosUsuario ">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>
                  <h4>EDITAR CATEGORÍA:</h4>{" "}
                </Form.Label>
                <Select
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: "black",
                    }),
                  }}
                  className="inputDesplegableRetocado"
                  placeholder="Categoría.."
                  options={options}
                  value={selectedOption}
                  onChange={handleOption}
                  isMulti
                />
              </Form.Group>
              <p className={style}>{msgSuccess}</p>
              <div className="DivGrisParaBotones mt-3">
                <button className="Button3" type="submit">
                  ACEPTAR
                </button>
                <button
                  className="Button1"
                  onClick={() => setShowCategories(false)}
                >
                  CANCELAR
                </button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </main>
  );
};
