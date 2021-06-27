import React from 'react'
import DownNavTable from './DownNavTable'

import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
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
        handleDownIndex, 
        setEditMode, 
        setInit
    } = props

    console.log(down)

    const prev = (amount) => {
        if (downIndex - amount >= 0){
            handleDownIndex(parseInt(downIndex)-parseInt(amount))
            setEditMode(true)
            setInit(false)
        } else {
            handleDownIndex(0)
        }
    }

    const next = (amount) => {
        if (downIndex + amount <= maxDowns){
            handleDownIndex(parseInt(downIndex)+amount)
            if (downIndex < maxDowns){
                setEditMode(true)
                setInit(false)
            } else {
                setEditMode(false)
                setInit(false)
            }
            //this isnt updated before
            if (downIndex + amount === maxDowns){
                resetDown()
                setInit(false)
                setEditMode(false)
            }
        } else {
            handleDownIndex(parseInt(maxDowns))
        }
    }
    
    return (
        <>
            <div style={{display:"flex",width: '100%',justifyContent: "space-between", marginBottom: "2rem"}}>
                {0 < downIndex && ( <Typography variant="h5" component="h1">Previous down: {prevDown + 1}</Typography>)}
                {maxDowns > downIndex && (<Typography style={{marginLeft:"auto"}} variant="h5" component="h1">Current down: {parseInt(downIndex) + 1}</Typography>)}
            </div>
            {downs[prevDown] ? (
                <div>
                    {downs[prevDown] && (
                        <div>
                            <DownNavTable previousDown={downs[prevDown]}/>
                        </div>
                    )}
                </div>
            ) : (<Typography variant="h5" component="h1">No previous down</Typography>)}
            <div style={{display:"flex",width: '100%',justifyContent: "space-between", marginBottom: "2rem", marginTop: "1rem"}}>
                {0 < downIndex && (
                <div>
                    <Tooltip title="prev" aria-label="previous play">
                        <button onClick={()=>prev(10)} style={{background: "none", border: "none", marginRight:"auto"}}>
                        <Fab color="primary">
                            <DoubleArrowIcon  style={{transform: "rotate(180deg)"}}/>
                        </Fab>
                        </button>
                    </Tooltip>
                    <Tooltip title="prev" aria-label="previous play">
                        <button onClick={()=>prev(1)} style={{background: "none", border: "none", marginRight:"auto"}}>
                        <Fab color="primary">
                            <ArrowForwardIosIcon  style={{transform: "rotate(180deg)"}}/>
                        </Fab>
                        </button>
                    </Tooltip>
                </div>
                )}

                
                {maxDowns > downIndex && down.playType !== "Game end" && ( 
                    <div style={{marginLeft: "auto"}}>
                        <Tooltip title="prev" aria-label="previous play">
                            <button onClick={()=>next(1)} style={{background: "none", border: "none", marginLeft:"auto"}}>
                                <Fab color="primary">
                                    <ArrowForwardIosIcon />
                                </Fab>
                            </button>
                        </Tooltip>
                        <Tooltip title="prev" aria-label="previous play">
                        <button onClick={()=>next(10)} style={{background: "none", border: "none", marginLeft:"auto"}}>
                            <Fab color="primary">
                                <DoubleArrowIcon />
                            </Fab>
                        </button>
                    </Tooltip>
                   </div>
                )}
            </div>
        </>
    )
}
