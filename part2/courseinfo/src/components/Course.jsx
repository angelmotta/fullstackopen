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

export default Course;
