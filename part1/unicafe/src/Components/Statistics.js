import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
    return (
        <>
            <h2>Statistics</h2>
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
            </ul>
        </>
    )
}

export default Statistics