import React from 'react';

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
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
                <li>All: {total}</li>
                <li>Postive: {percentGood}%</li>
            </ul>
        </>
    )
}

export default Statistics