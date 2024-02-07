import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { FormAddTopic } from "../FormAddTopic/FormAddTopic";
import { CardTopic } from "../CardTopic/CardTopic";
import "./CardSection.scss";
export const CardSection = ({
  elem,
  deleteSection,
  course_id,
  sections,
  topics,
  setTopics,
  setResetCourse,
  resetCourse,
  deleteTopic,
  userId,
  userCourse,
  setAddTopic,
  setAddSection,
  index,
  resource,
  setResource,
  deleteResource,
  isIntoValidate,
  isConfirmed
}) => {
  const [showTopic, setShowTopic] = useState(false);
  const [orderedTopics, setOrderedTopics] = useState([]);

  useEffect(() => {
    const sortedTopics = elem.section_topics
      .slice()
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setOrderedTopics(sortedTopics);
  }, [elem.section_topics]);

  const handleClick = () => {
    setShowTopic(true);
  };

  return (
    <Accordion.Item eventKey={index} className="sectionCard">
      <Accordion.Header className="sectionHeader">
        <div className="pplCardSection">
          <div className="titleSection my-2">{`${index}. ${elem.section_title}`}</div>
          <div className="botonsppalCardSection d-flex gap-3">
            {userId === userCourse && (
              <Button
                className="addSection"
                variant="outline-success"
                onClick={handleClick}
                disabled={
                  showTopic ? true : false || isIntoValidate && !isConfirmed ? true : false
                }
              >
                <span className="material-symbols-outlined addIcon">upload</span>
              </Button>
            )}
            {userId === userCourse && (
              <button
                className="deleteSection"
                variant="outline-success"
                onClick={() => deleteSection(elem.section_id)}
                disabled={isIntoValidate && !isConfirmed ? true : false}
              >
                <span className="material-symbols-outlined deleteIcon">
                  delete
                </span>
              </button>
            )}
          </div>
        </div>
        
      </Accordion.Header>
      <Accordion.Body>
        <Accordion defaultActiveKey="1" className="w-100">
        {elem.section_topics.map((topic, index) => {
              return (
          <CardTopic
          key={`${elem.topic_id}-${index}`}
          topics={topics}
          setTopics={setTopics}
          topic={topic}
          deleteTopic={deleteTopic}
          section_id={elem.section_id}
          setResetCourse={setResetCourse}
          resetCourse={resetCourse}
          index={index + 1}
          setResource={setResource}
          resource={resource}
          course_id={course_id}
          deleteResource={deleteResource}
          userId={userId}
          userCourse={userCourse}
          isIntoValidate={isIntoValidate}
          isConfirmed={isConfirmed}
          />
          );
        })}
        {showTopic && (
          <FormAddTopic
            setShowTopic={setShowTopic}
            course_id={course_id}
            sections={sections}
            section_id={elem.section_id}
            topics={topics}
            setTopics={setTopics}
            setResetCourse={setResetCourse}
            resetCourse={resetCourse}
            setAddTopic={setAddTopic}
            setAddSection={setAddSection}
          />
        )}

        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
};
