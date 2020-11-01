import React from 'react'
import spinner from "./../static/images/spinner.svg"

const Preloader = () => {
    return (
       <div className="spinner">
           <img src={spinner} alt="spinner" />
       </div>
    )
}

export default Preloader
