const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Content = (props) => {
    console.log(props);
    const { parts } = props;
    return (
        <>
            <Part name={parts[0].name} number={parts[0].exercises} />
            <Part name={parts[1].name} number={parts[1].exercises} />
            <Part name={parts[2].name} number={parts[2].exercises} />
        </>
    );
};

const Total = (props) => {
    const { parts } = props;
    const exercises1 = parts[0].exercises;
    const exercises2 = parts[1].exercises;
    const exercises3 = parts[2].exercises;
    return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const Part = (props) => {
    const { name, number } = props;
    return (
        <p>
            {name} {number}
        </p>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default App;
