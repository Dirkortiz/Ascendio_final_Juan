import React from 'react'
import { Card } from 'react-bootstrap'
import { RatingStars } from '../RatingStars/RatingStars';
import './cardRatingOneCourse.scss';

export const CardRatingsOneCourse = ({rates}) => {

  return (
    <Card className='cardRateOneCourse'>
    <Card.Body>
      <Card.Title>{rates?.nickname}</Card.Title>
      <RatingStars
        numberstars={rates?.course_rates}
      />
      <Card.Subtitle>
        {rates?.commentary}
      </Card.Subtitle>
      
    </Card.Body>
  </Card>
  )
}
