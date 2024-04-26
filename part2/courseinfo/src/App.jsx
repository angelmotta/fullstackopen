const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => (
    <>
        {parts.map((partObj) => (
            <Part key={partObj.id} part={partObj} />
        ))}
    </>
);

const Course = ({ course }) => {
    const { name, parts } = course;
    const totalExercises = parts.reduce(
        (accum, partObj) => accum + partObj.exercises,
        0
    );

    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={totalExercises} />
        </div>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
        ],
    };

    return <Course course={course} />;
};

export default App;
