import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ModalResource } from "../ModalResource/ModalResource";
import { Cardresource } from "../CardResource/Cardresource";
import axios from "axios";
import "./CardTopic.scss";

export const CardTopic = ({
  topic,
  deleteTopic,
  section_id,
  setResetCourse,
  resetCourse,
  index,
  course_id,
  deleteResource,
  userId,
  userCourse,
  isIntoValidate,
  isConfirmed
}) => {
  const [showModalArchivo, setShowModalArchivo] = useState(false);
  const [resource, setResource] = useState();

  const handleClick = () => {
    setShowModalArchivo(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getoneresource/${course_id}/${section_id}/${topic.topic_id}`
      )
      .then((res) => {
        setResource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [course_id, section_id, topic.topic_id, resetCourse]);

  return (
    <Card className="pplTopic px-2">
      <Card.Body className="TopicCardBody">
        <div className="pplCardTopic">
          <div className="titleTopic my-2">{`${index}. ${topic.topic_title}`}</div>

          <div className="botonsppalCardTopic d-flex gap-3">
            {resource?.length === 0 && userId === userCourse && (
              <Button
                className="addTopic"
                variant="outline-success"
                onClick={handleClick}
                disabled={isIntoValidate && !isConfirmed ? true : false}
              >
                <span class="material-symbols-outlined addIcon">upload</span>
              </Button>
            )}
            {userId === userCourse && (
              <Button
                className="deleteTopic"
                variant="outline-danger"
                onClick={() => deleteTopic(section_id, topic.topic_id)}
                disabled={isIntoValidate && !isConfirmed ? true : false}
              >
                <span class="material-symbols-outlined deleteIcon">
                  delete
                </span>
              </Button>
            )}
          </div>
        </div>

        {showModalArchivo && (
          <ModalResource
            showModalArchivo={showModalArchivo}
            setShowModalArchivo={setShowModalArchivo}
            setResetCourse={setResetCourse}
            resetCourse={resetCourse}
            section_id={section_id}
            topic_id={topic.topic_id}
          />
        )}

       
          {topic && (
            <Cardresource
              resource={resource}
              course_id={course_id}
              deleteResource={deleteResource}
              isIntoValidate={isIntoValidate}
              userId={userId}
              userCourse={userCourse}
              section_id={section_id}
              topic_id={topic.topic_id}
              isConfirmed={isConfirmed}
            />
          )}
       
      </Card.Body>
    </Card>
  );
};
