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

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2,
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3,
            },
            {
                name: 'Redux',
                exercises: 1000,
                id: 4,
            },
        ],
    };
    return <Course course={course} />;
};

export default App;
