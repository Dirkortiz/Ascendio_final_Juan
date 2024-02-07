import React, { useEffect, useState } from 'react'
import './ratingStars.scss'

export const RatingStars = ({numberstars}) => {
  //const [ratingUser, setRatingUser] = useState([]);
  let stars = new Array(5);

  stars.fill("☆")

      let prueba = stars.map((elem,i)=>{
      if(i < numberstars ){
        return "★"
      }else{
        return "☆"
      }
    })
    
  return (
    <div className='stars'>{prueba.join("")}</div>
  )
}
