const Hello = (props) => {
    return (
        <div>
            <p>
                Hello {props.name} {props.lastname}
            </p>
        </div>
    );
};

const Foo = () => {
    return (
        <div>
            greeting app created by{" "}
            <a href="https://github.com/mluukkai">mluukkai</a>
        </div>
    );
};

const App = () => {
    const lastname = "Motta";
    const newPerson = { name: "Peter", age: 4 };
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Angel" lastname={lastname} />
            <p>{newPerson.name}</p>
            <Foo />
        </div>
    );
};

export default App;
