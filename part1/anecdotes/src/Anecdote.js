import React from 'react';

const Anecdote = (props) => {
    return(
        <>
        <h1>{props.title}</h1>
        <p className="anecdote">
            {props.text}
            <span> - {props.votes} votes</span> 
        </p>
      </>
    )
}

export default Anecdote