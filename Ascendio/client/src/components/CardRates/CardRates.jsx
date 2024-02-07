import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AscendioContext } from "../../context/AscendioContext";
import { useParams } from "react-router-dom";
import './cardRates.scss'

const initialValue = {
  course_rates: "",
  commentary: "",
};

export const CardRates = ({ resetCourse, setResetCourse, setShowCardRate, rates, peopleVotesCourse, setPeopleVotesCourse}) => {
  const [newRate, setNewRate] = useState(initialValue);
  const [msgError, setMsgError] = useState("")
  const [myRate, setMyRate] = useState([]);
  const [sumar, setSumar] = useState(0) // COSAS NUEVAS
  const [value, setValue] = useState('');
  const course_id = useParams().course_id;
  const { user } = useContext(AscendioContext);
  let usuario = user.user_id;

  useEffect(() => {
    if(rates){
    setMyRate(rates.filter((elem)=> elem.user_rater_user_id === usuario
    ))}
  }, [])

  const regexNumber = /^[1-5]*$/;
  const newVote = peopleVotesCourse + 1

  const handleSubmit = () => {
    if (!regexNumber.test(newRate.course_rates)) {
      setMsgError("Introduce un número entre 1 y 5.");
      return;
    }

    const { course_rates, commentary } = newRate;
    let data = { course_rates, commentary, usuario };

    axios
    .post(`http://localhost:3000/courses/userrateonecourse/${course_id}`, data)
    .then((res)=>{
      setShowCardRate(false)
      setPeopleVotesCourse(newVote);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[1-5]$/;
  
    if (name === 'course_rates') {
      if (regex.test(value) || value === '') {
        setNewRate({ ...newRate, [name]: value });
      } else {
        setMsgError("Inserta un valor entre 1 y 5");
      }
    } else {
      setNewRate({ ...newRate, [name]: value });
    }
  };

  return (

    <>{myRate.length === 0 &&
      <Card style={{ width: '18rem' }} className="cardRates p-3">

      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tu reseña</Form.Label>
            <Form.Control
              type="text"
              placeholder="Puntúa de 1 a 5"
              name="course_rates"
              value={newRate?.course_rates}
              onChange={handleChange}
              className="cardRatesInput mb-3"
              autoFocus
            />
            <Form.Control
              type="text"
              placeholder="Comparte tu experiencia"
              name='commentary'
              value={newRate?.commentary}
              onChange={handleChange}
              className="cardRatesInput mb-3"
            />
             <h6 className="text-center mb-2"  style={{ color: '#E25252' }}>{msgError}</h6>
             <div className="d-flex justify-content-center"> 
            <button
              className="Button3"
              onClick={handleSubmit}
            >
              Aceptar
            </button>
            </div>
          </Form.Group>
        </Form>
    </Card>}
  </>
  )
}

