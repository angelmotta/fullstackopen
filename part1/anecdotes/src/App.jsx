import { useState } from "react";

const Anecdote = (props) => {
    const { title, anecdote, votes } = props;
    return (
        <div>
            <h1>{title}</h1>
            <div>{anecdote}</div>
            <div>has {votes} votes</div>
        </div>
    );
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const lenArray = anecdotes.length;
    const votesArray = new Array(lenArray).fill(0);

    const getRandIndex = (lenArray) => {
        return Math.floor(Math.random() * lenArray);
    };

    const randIdx = getRandIndex(lenArray);
    const [selected, setSelected] = useState(randIdx);
    const [votes, setVotes] = useState(votesArray);

    const handleOnClickNext = () => {
        const randIdx = getRandIndex(lenArray);
        setSelected(randIdx);
    };

    const handleOnClickVote = () => {
        const updatedVotes = [...votes]; // create a copy
        updatedVotes[selected] += 1; // mutate copy array (not directly the original array )
        setVotes(updatedVotes); // update state using setState function and a new array as input
    };

    const getAnecdoteMostVotes = () => {
        let maxVotes = -1;
        let idxAnecdote = -1;
        votes.forEach((val, idx) => {
            if (val > maxVotes) {
                maxVotes = val;
                idxAnecdote = idx;
            }
        });

        const ans = {
            idx: idxAnecdote,
            votes: maxVotes,
        };
        return ans;
    };

    const idxVotesObj = getAnecdoteMostVotes();
    const numVotesMaxAnecdote = idxVotesObj.votes;
    const anecdotemaxVotes = anecdotes[idxVotesObj.idx];

    const anecdoteOfDay = anecdotes[selected];
    const numVotesAnecdoteDay = votes[selected];
    return (
        <div>
            <Anecdote
                title="Anecdote of the day"
                anecdote={anecdoteOfDay}
                votes={numVotesAnecdoteDay}
            />
            <button onClick={handleOnClickVote}>vote</button>
            <button onClick={handleOnClickNext}>next anecdote</button>
            <Anecdote
                title="Anecdote with most votes"
                anecdote={anecdotemaxVotes}
                votes={numVotesMaxAnecdote}
            />
        </div>
    );
};

export default App;
