import React from 'react'
import './Test.css'

const Test = () => {
    return (
        <section className="hero">
            <div className="curve top"></div>
            <div className="content">
                <h1>Hello World!</h1>
                <p>This is the hero section with the wavy background on top and bottom.</p>
            </div>
            <div className="curve bottom"></div>
        </section>
    )
}

export default Test