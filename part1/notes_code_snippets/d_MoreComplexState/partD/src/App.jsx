import { useState } from "react";

const App = () => {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);

    const [allClicks, setAll] = useState([]);
    const [total, setTotal] = useState(0);

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
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}

            <p>{allClicks.join(" ")}</p>
            <p>total {total}</p>
        </div>
    );
};

export default App;
