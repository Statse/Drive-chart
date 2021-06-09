import React, {useState} from 'react'

import Pass from './Pass'
import Run from './Pass'


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Stats(props) {
    const [type, setType] =  useState("pass")
    const {game} = props

    return (
        <Card>
            <CardContent>
                <div style={{display: "flex", flexFlow: "row", justifyContent: "center"}}>
                    <Button variant="contained" onClick={()=>setType("game")} color={type ==="game" ? "primary" : ""}>Game</Button>
                    <Button variant="contained" onClick={()=>setType("pass")} color={type ==="pass" ? "primary" : ""}>Pass</Button>
                    <Button variant="contained" onClick={()=>setType("run")} color={type ==="run" ? "primary" : ""}>Run</Button>
                </div>
            </CardContent>
            {type === "pass"  && (<Pass game={game}/>)}
            {type === "run"  && (<Run game={game}/>)}
        </Card>
    )
}
