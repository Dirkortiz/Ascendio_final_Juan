import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardResource.scss";

export const Cardresource = ({
  resource,
  course_id,
  deleteResource,
  section_id,
  topic_id,
  isIntoValidate,
  isConfirmed,
  userId,
  userCourse,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    let link = "";

    if (resource[0].resource_type === 1) {
      link = `${resource[0].text}`;
    } else {
      link = resource[0].text;
    }
    navigate(
      `/resource/${course_id}/${section_id}/${link}/${resource[0].resource_type}`
    );
  };

  return (
    <div className="d-flex justify-content-between pplCardResource">
      {resource &&
        (resource[0]?.resource_type === 1 ||
          resource[0]?.resource_type === 2) && (
          <>
            <Button
              className="botonResource d-flex justify-content-center align-items-center"
              onClick={handleClick}
              disabled={isIntoValidate && !isConfirmed ? true : false}
            >
              {resource[0]?.resource_type === 1 ? (
                <span class="material-symbols-outlined resourceIcon d-flex justify-content-center align-items-center">description</span> 
              ) : null}
              {resource[0]?.resource_type === 2 ? (
                <span class="material-symbols-outlined resourceIcon d-flex justify-content-center align-items-center">smart_display</span>
              ) : null}
            </Button>
          </>
        )}
    </div>
  );
};
