const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
    <p>
        <b>Total of {sum} exercises</b>
    </p>
);

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
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
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
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map((courseObj) => (
                <Course key={courseObj.id} course={courseObj} />
            ))}
        </>
    );
};

export default App;
