import { useState } from "react";

const App = () => {
    const [counter, setCounter] = useState(0);
    console.log("rendering with counter value", counter);

    const increaseByOne = () => {
        console.log("increasing, value before", counter);
        setCounter(counter + 1);
    };

    const decreaseByOne = () => {
        console.log("decreasing, value before", counter);
        setCounter(counter - 1);
    };
    const setToZero = () => {
        console.log("resetting to zero, value before", counter);
        setCounter(0);
    };

    return (
        <div>
            <Display counter={counter} />
            <Button onClick={increaseByOne} text="Plus" />
            <Button onClick={setToZero} text="Reset" />
            <Button onClick={decreaseByOne} text="Minus" />
        </div>
    );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
