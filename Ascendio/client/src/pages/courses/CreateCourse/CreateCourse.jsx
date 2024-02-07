import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./createCourse.scss";
import "./estilocreacion.scss";
import { useNavigate } from "react-router-dom";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import Select from "react-select";
/* import "../../../../public/stylesheets/FormulariosEInputs.scss"; */

const initialValue = {
  title: "",
  description: "",
  price: "",
};

export const CreateCourse = () => {
  const [createOneCourse, setCreateOneCourse] = useState(initialValue);
  const [file, setFile] = useState();
  const [msgError, setMsgError] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);

  const { user, setUser, userCourse, setUserCourse } =
    useContext(AscendioContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/calltags")
      .then((res) => {
        setOptions(
          res.data.map((elem) => ({ value: elem.tag_id, label: elem.tag_name }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    
  console.log("op", options);
    const handleFile = (e) => {
      setFile(e.target.files[0]);
    };
    
    const handleOption = (option) => {
      setSelectedOption(option);
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      let newValue = value;
      if (name === 'price') {
        newValue = value.replace(/^(?:(\d{1,5}(?:\.\d{0,2})?)|\D+).*$/g, '$1');
      }
      setCreateOneCourse({ ...createOneCourse, [name]: newValue });
    };
    
    let regexPrice = /^(?:(\d{1,5}(?:\.\d{0,2})?)|\D+).*$/g;
    let regexTitle = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,:?¿!¡]{1,50}$/;
    let regexDescription = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑüÜ.,:?¿!¡]{1,250}$/;

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!createOneCourse.title || !createOneCourse.description || !createOneCourse.price){
      setMsgError('Por favor, completa todos los campos');
      }else if (!regexTitle.test(createOneCourse.title)) {
      setMsgError("No se permiten más de 50 caracteres");
    } else if (!regexDescription.test(createOneCourse.description)) {
      setMsgError("No se permiten más de 250 caracteres");
    } else if (!regexPrice.test(createOneCourse.price)) {
      setMsgError("No se permiten más de 99999 euros");
    } else {
      const newFormData = new FormData();

      let data = { ...createOneCourse, user_id: user.user_id };

      newFormData.append("crearCurso", JSON.stringify(data));
      newFormData.append("tags", JSON.stringify(selectedOption));
      newFormData.append("file", file);

      axios
        .post("http://localhost:3000/courses/createcourse", newFormData)
        .then((res) => {
          setUserCourse(res.data);
          let course_id = res.data.insertId;
          navigate(`/course/${course_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Row className="d-flex justify-content-center text-center p-5  EdicionCursosContainerFormulario createcourseformulario ">
      <Col md={4}>
        <Form onSubmit={handleSubmit} >
          <h2>Crea tu curso</h2>
          <Form.Group controlId="formFile" className="mb-3 d-flex justify-content-center">
              <div className="imagencurso" > 
              <Form.Label className="d-flex justify-content-center">
                <span className="material-symbols-outlined addIcon">
                  photo_camera
                </span>
              </Form.Label>
              </div>
            <Form.Control type="file" onChange={handleFile} hidden />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Título </Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="Título"
              name="title"
              value={createOneCourse.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción </Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              name="description"
              value={createOneCourse.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio </Form.Label>
            <Form.Control
              type="text"
              placeholder="€"
              name="price"
              value={createOneCourse.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags </Form.Label>
            <Select
              classNames="inputCreación"
              placeholder="Añade tags"
              options={options}
              value={selectedOption}
              onChange={handleOption}
              isMulti
              isOptionDisabled={(option) =>
                selectedOption.length >= 4 && !selectedOption.includes(option)
              }
              
              className="react-select-container mb-4"
              classNamePrefix="react-select"
            />
          </Form.Group>

          <h5>{msgError}</h5>

          <Button
            variant="outline-success"
            className="me-3  Button2"
            type="submit"
            
          >
            Siguiente
          </Button>
          <Button
            variant="outline-success"
            className="me-3  Button2"
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
