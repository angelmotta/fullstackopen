import { useState } from "react";

const History = (props) => {
    if (props.allClicks.length === 0) {
        return <div>the app is used by pressing the buttons</div>;
    }
    return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Display = (props) => <div>{props.value}</div>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);
    const [total, setTotal] = useState(0);

    const [value, setValue] = useState(10);

    const hello = (who) => () => console.log("hello ", who);

    const setToValue = (newValue) => {
        console.log("value now", newValue); // print the new value to console
        setValue(newValue);
    };

    const handleLeftClick = () => {
        setAll(allClicks.concat("L")); // concat return a new array
        console.log("left before", left);
        const updatedLeft = left + 1; // synchronous operation
        console.log(`sync updatedLeft: ${updatedLeft}`);
        setLeft(updatedLeft);
        console.log("left after", updatedLeft);
        setTotal(updatedLeft + right);
    };

    const handleRightClick = () => {
        setAll(allClicks.concat("R")); // a new array is set to the state
        const updatedRight = right + 1;
        setRight(updatedRight);
        setTotal(left + updatedRight);
    };

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text="left" />
            <Button handleClick={handleRightClick} text="right" />
            {right}

            <History allClicks={allClicks} />
            <p>total {total}</p>

            <br />
            <p>Closures</p>
            <div>
                <Display value={value} />
                <Button handleClick={() => setToValue(1000)} text="thousand" />
                <Button handleClick={() => setToValue(0)} text="reset" />
                <Button handleClick={() => setToValue(value + 1)} text="+1" />
            </div>
        </div>
    );
};

export default App;
