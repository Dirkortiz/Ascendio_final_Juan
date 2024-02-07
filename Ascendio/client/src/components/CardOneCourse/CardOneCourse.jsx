import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { RatingStars } from '../Courses/RatingStars/RatingStars'
import { useNavigate } from 'react-router-dom'

export const CardOneCourse = ({elem}) => {

  const [tags, setTags] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    axios
      .get(`http://localhost:3000/courses/getalltagsonecourse/${elem.course_id}`)
      .then((res)=>{
        setTags(res.data.map((e)=>e.tag_name).join(" "))
      })
      .catch((err)=>{
        console.log(err);
      })
  }, [])

  
  return (
    <Card
    className="mapeoAllCourse text-center mb-4"
    style={{ width: "100%" }}
  >
    <Card.Img
      style={{ height: "16rem", objectFit: "cover" }}
      variant="top"
      src={`http://localhost:3000/images/cursos/${elem.img}`}
    />
    <Card.Body className="d-flex flex-column gap-1">
      <Card.Text className="cardtitle"> {elem.title} </Card.Text>

      {elem.average_rating && (
        <RatingStars numberstars={elem.average_rating} />
      )}
      <Card.Subtitle className="tagsCourse">
        {tags}
      </Card.Subtitle>
      <Card.Title className="descriptioncard d-flex justify-content-start flex-grow-1">
        {elem.description}
      </Card.Title>
      <Card.Text className="priceCourse cardtitle px-3 my-1">
        {Number(elem?.price) === 0 ? "GRATIS" : `${elem?.price}€`}
      </Card.Text>
      <Card.Text className="d-flex justify-content-center mt-auto">
        <button
          className="Button3"
          onClick={() => navigate(`/course/${elem.course_id}`)}
        >
          Más info
        </button>
      </Card.Text>
    </Card.Body>
  </Card>
  )
}
