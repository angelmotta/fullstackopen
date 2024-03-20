import { useState } from "react";

const App = () => {
    const [goodCounter, setGoodCounter] = useState(0);
    const [neutralCounter, setNeutralCounter] = useState(0);
    const [badCounter, setBadCounter] = useState(0);

    const handleClickGood = () => setGoodCounter(goodCounter + 1);

    const handleClickNeutral = () => setNeutralCounter(neutralCounter + 1);

    const handleClickBad = () => setBadCounter(badCounter + 1);

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={handleClickGood} text="Good" />
            <Button handleClick={handleClickNeutral} text="Neutral" />
            <Button handleClick={handleClickBad} text="Bad" />
            <h1>Statistics</h1>
            <p>Good {goodCounter}</p>
            <p>Neutral {neutralCounter}</p>
            <p>Bad {badCounter}</p>
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

export default App;
