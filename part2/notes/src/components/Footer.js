import React from 'react'

const Footer = () => {
  const footerStyle = {
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    fontSize: 16,
    fontStyle: 'italic',
    justifyContent: 'center',
    margin: '20px -20px -20px -20px',
    padding: '5px',
  }

  return (
    <footer style={footerStyle}>
      <br />
      <em>Note app, Departmetn of Computer Science, University of Helsinki, 2021</em>
    </footer>
  )
}

export default Footer