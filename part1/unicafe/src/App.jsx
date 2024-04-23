import { useState } from "react";

const StatisticLine = ({ text, value }) => (
    <tr>
        <th>{text}</th>
        <td>{value}</td>
    </tr>
);

const Statistics = ({
    goodCounter,
    neutralCounter,
    badCounter,
    allCounter,
    average,
    positivePorcentage,
}) => {
    return allCounter === 0 ? (
        <>No feedback given</>
    ) : (
        <>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={goodCounter} />
                    <StatisticLine text="Neutral" value={neutralCounter} />
                    <StatisticLine text="Bad" value={badCounter} />
                    <StatisticLine text="All" value={allCounter} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine
                        text="Positive"
                        value={positivePorcentage + " %"}
                    />
                </tbody>
            </table>
        </>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const App = () => {
    const [goodCounter, setGoodCounter] = useState(0);
    const [neutralCounter, setNeutralCounter] = useState(0);
    const [badCounter, setBadCounter] = useState(0);
    const [allCounter, setAllCounter] = useState(0);
    const [average, setAverage] = useState(0);
    const [positivePorcentage, setPositivePorcentage] = useState(0);

    const handleClickGood = () => {
        const updatedGoodCounter = goodCounter + 1;
        setGoodCounter(updatedGoodCounter);
        const updatedAllCounter = allCounter + 1;
        setAllCounter(updatedAllCounter);
        const newAvg = (updatedGoodCounter - badCounter) / updatedAllCounter;
        setAverage(newAvg);
        setPositivePorcentage((updatedGoodCounter / updatedAllCounter) * 100);
    };

    const handleClickNeutral = () => {
        setNeutralCounter(neutralCounter + 1);
        const updatedAllCounter = allCounter + 1;
        setAllCounter(updatedAllCounter);
        setPositivePorcentage((goodCounter / updatedAllCounter) * 100);
    };

    const handleClickBad = () => {
        const updatedBadCounter = badCounter + 1;
        setBadCounter(updatedBadCounter);
        const updatedAllCounter = allCounter + 1;
        setAllCounter(updatedAllCounter);
        const newAvg = (goodCounter - updatedBadCounter) / updatedAllCounter;
        setAverage(newAvg);
        setPositivePorcentage((goodCounter / updatedAllCounter) * 100);
    };

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={handleClickGood} text="Good" />
            <Button handleClick={handleClickNeutral} text="Neutral" />
            <Button handleClick={handleClickBad} text="Bad" />
            <h1>Statistics</h1>
            <Statistics
                goodCounter={goodCounter}
                neutralCounter={neutralCounter}
                badCounter={badCounter}
                allCounter={allCounter}
                average={average}
                positivePorcentage={positivePorcentage}
            />
        </div>
    );
};

export default App;
