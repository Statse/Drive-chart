import React from 'react'
import DownNavTable from './DownNavTable'

import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';


export default function DownNavigation(props) {
    const {
        resetDown, 
        downs, 
        prevDown, 
        down, 
        maxDowns, 
        downIndex, 
        setDownIndex, 
        setEditMode, 
        setInit
    } = props

    

    const prev = () => {
        if (downIndex - 1 >= 0){
            setDownIndex(downIndex-1)
            setEditMode(true)
            setInit(false)
        } else {
            console.error("Invalid index: " + downIndex - 1)
            alert("Invalid index: " + downIndex - 1)
        }
    }

    const next = () => {
        if (downIndex + 1 <= maxDowns){
            setDownIndex(downIndex+1)
            if (downIndex < maxDowns){
                setEditMode(true)
                setInit(false)
            } else {
                setEditMode(false)
                setInit(false)
            }
            //this isnt updated before
            if (downIndex + 1 === maxDowns){
                resetDown()
                setInit(false)
                setEditMode(false)
            }
        } else {
            console.error("Invalid index: " + downIndex + 1)
            alert("Invalid index: " + downIndex + 1)
        }
    }

    console.log("downs[prevDown]", downs[prevDown])
    
    return (
        <>
            {downs[prevDown] ? (
                <div>
                    <Typography variant="h5" component="h1">Current down: {downIndex}</Typography>
                    <Typography variant="h5" component="h1">Previous down: {prevDown}</Typography>
                    {downs[prevDown] && (
                        <div>
                            <DownNavTable previousDown={downs[prevDown]}/>
                        </div>
                    )}
                </div>
            ) : (<h3>No previous down</h3>)}
            <div style={{display:"flex",width: '100%',justifyContent: "space-between", marginBottom: "2rem"}}>
                {0 < downIndex && (
                    <Tooltip title="prev" aria-label="previous play">
                        <button onClick={prev} style={{background: "none", border: "none", marginRight:"auto"}}>
                        <Fab color="primary">
                            <ArrowForwardIosIcon  style={{transform: "rotate(180deg)"}}/>
                        </Fab>
                        </button>
                    </Tooltip>
                )}

                
                {maxDowns > downIndex && ( 
                    <Tooltip title="prev" aria-label="previous play">
                        <button onClick={next} style={{background: "none", border: "none", marginLeft:"auto"}}>
                            <Fab color="primary">
                                <ArrowForwardIosIcon />
                            </Fab>
                        </button>
                    </Tooltip>
                )}
            </div>
        </>
    )
}
