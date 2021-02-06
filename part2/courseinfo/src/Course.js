import React from "react";

//Header, Content, and Total
const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.length !== 0 ? (
        parts.map((part) => (
          <p key={part.id}>
            {part.name}: {part.exercises}
          </p>
        ))
      ) : (
        <p>No course available</p>
      )}
    </div>
  );
};
const Total = ({ parts }) => {
  return (
    <p>
      Total of{" "}
      {parts.length !== 0
        ? parts.reduce((acc, obj) => acc + obj.exercises, 0)
        : 0}{" "}
      exercises
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
