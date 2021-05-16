import React, { useState } from 'react'
  

export default function Modal(props) {
    const [show, setShow] = useState(true)
    setTimeout(function(){ 
        setShow(false);
    }, 
    props.timeout || 3000);

    return (
        <>
            {show && (
                <div>
                    <h3>{props.heading}</h3>
                    <p>{props.text}</p>
                </div>
            )}
        </>
    )
}
