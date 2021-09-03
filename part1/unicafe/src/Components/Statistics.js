import React from 'react';

const StatisticsLine = ({ text, value }) => {
    return (
        <div>{text}: {value}</div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const total = good + bad + neutral
    const percentGood = good / total * 100

    if (total === 0) {
        return (
            <>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <h2>Statistics</h2>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={total} />
            <StatisticsLine text="Positive" value={percentGood} />

        </>
    )
}

export default Statistics