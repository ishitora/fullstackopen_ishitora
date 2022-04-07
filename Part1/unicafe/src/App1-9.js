import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;

    return (
        <>
            <h3>Statistics</h3>

            {all === 0 ? (
                'no feedback given'
            ) : (
                <div>
                    <p>good:{good}</p>
                    <p>neutral:{neutral}</p>
                    <p>bad:{bad}</p>
                    <p>all:{all}</p>
                    <p>average:{average}</p>
                    <p>positive:{`${positive}%`}</p>
                </div>
            )}
        </>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h3>Give feedback</h3>
            <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={() => {
                        setGood((preCount) => preCount + 1);
                    }}
                >
                    good
                </button>
                <button
                    onClick={() => {
                        setNeutral((preCount) => preCount + 1);
                    }}
                >
                    neutral
                </button>
                <button
                    onClick={() => {
                        setBad((preCount) => preCount + 1);
                    }}
                >
                    bad
                </button>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
