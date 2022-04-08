import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);
const Content = ({ parts }) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} part={part} />
        ))}
    </div>
);

const Total = ({ parts }) => (
    <p>
        Number of exercises {parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)}
    </p>
);

const Course = ({ course }) => (
    <div>
        {course.name && <Header course={course.name} />}

        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
);

const Courses = ({ courses }) => (
    <div>
        {courses.map((course) => (
            <Course key={course.id} course={course} />
        ))}
    </div>
);

export default Courses;
