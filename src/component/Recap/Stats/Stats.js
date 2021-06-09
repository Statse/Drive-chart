import React, {useState} from 'react'
import Button from '@material-ui/core/Button';

export default function Stats(props) {
    const [type, setType] =  useState("pass")
    const {game} = props
    const typeOptions = [
        "pass",
        "run",
    ]

    

    return (
        <div>
            <div style={{display: "flex", flexFlow: "row"}}>
                <Button variant="contained" onClick={()=>setType("pass")} color={type ==="pass" ? "primary" : ""}>Pass</Button>
                <Button variant="contained" onClick={()=>setType("run")} color={type ==="run" ? "primary" : ""}>Run</Button>
            </div>
        </div>
    )
}
