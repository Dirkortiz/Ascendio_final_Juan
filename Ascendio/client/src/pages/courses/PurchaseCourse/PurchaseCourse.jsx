import React, { useEffect, useState } from "react";
import "./purchaseCourse.scss";
import { PurchaseCourseCard } from "../../../components/Courses/PurchaseCourseCard/PurchaseCourseCard";
import axios from "axios";

export const PurchaseCourse = () => {
  const [cursosComprados, setCursosComprados] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/courses/viewpurchasedcourse")
      .then((res) => {
        console.log(res.data);
        setCursosComprados(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <PurchaseCourseCard />
    </div>
  );
};






