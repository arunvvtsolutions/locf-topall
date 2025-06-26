import React from "react";
import { useParams } from "react-router-dom";
import CourseDetailTabs from "./CourseDetailTabs";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>(); // ✅ Gets the ID from URL

  return (
    <div>
      <CourseDetailTabs courseId={id || ""} />
    </div>
  );
};

export default CourseDetails;
