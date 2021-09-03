import React from 'react';

const StatisticsLine = ({ text, value }) => {
    return (
        <>
            <th>{text}</th>
            <td>{value}</td>
        </>
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
            <table>
                <thead>
                    <tr>
                    <th>Statistics</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <StatisticsLine text="Good" value={good} />
                    </tr>
                    <tr>
                    <StatisticsLine text="Neutral" value={neutral} />
                    </tr>
                    <tr>
                    <StatisticsLine text="Bad" value={bad} />
                    </tr>
                    <tr>
                    <StatisticsLine text="All" value={total} />
                    </tr>
                    <tr>
                    <StatisticsLine text="Positive" value={percentGood + 
                    " %"} />
                    </tr>
                </tbody>
            </table>

        
            
           
           

        </>
    )
}

export default Statistics