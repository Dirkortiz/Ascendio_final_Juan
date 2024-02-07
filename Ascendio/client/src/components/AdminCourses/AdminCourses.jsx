import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminOneCourse } from "../AdminOneCourse/AdminOneCourse";
import { Col, Row } from "react-bootstrap";


export const AdminCourses = () => {
  const [course, setCourse] = useState();
  const [updateCourses, setUpdateCourses] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/admingetallcourses`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateCourses]);

  return (
      <>
        {course?.map((elem) => {
          return (
            <Col xs={12} md={6} lg={4} xxl={3} className="d-flex">
              <AdminOneCourse
                elem={elem}
                key={elem.course_id}
                updateCourses={updateCourses}
                setUpdateCourses={setUpdateCourses}
              />
            </Col>
          );
        })}
      </>
  );
};

