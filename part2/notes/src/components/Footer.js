import React from "react";

const Footer = () => {
    const footerStyle = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        left: 0,
        bottom: 0,
        backgroundColor: 'black',
        color: 'white',
        fontStyle: 'italic',
        fontSize: 16,
        width: '100%'
    }

    return (
        <footer style={footerStyle}>
            <br />
            <em>Note app, Departmetn of Computer Science, University of Helsinki, 2021</em>
        </footer>
    )
}

export default Footer;