import { useState } from 'react';

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;
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
            <h3>Statistics</h3>
            <div>
                <p>good:{good}</p>
                <p>neutral:{neutral}</p>
                <p>bad:{bad}</p>
                <p>all:{all}</p>
                <p>average:{Number.isNaN(average) ? '' : average}</p>
                <p>positive:{Number.isNaN(positive) ? '' : `${positive}%`}</p>
            </div>
        </div>
    );
};

export default App;
