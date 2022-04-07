import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

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
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="all" value={all} />
                        <StatisticLine text="average" value={average} />
                        <StatisticLine text="positive" value={`${positive}%`} />
                    </tbody>
                </table>
            )}
        </>
    );
};
const FeedbackButton = ({ text, setCount }) => (
    <button
        onClick={() => {
            setCount((preCount) => preCount + 1);
        }}
    >
        {text}
    </button>
);

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h3>Give feedback</h3>
            <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
                <FeedbackButton text="good" setCount={setGood} />
                <FeedbackButton text="neutral" setCount={setNeutral} />
                <FeedbackButton text="bad" setCount={setBad} />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
