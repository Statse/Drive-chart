import React from 'react'
import DownNavTable from './DownNavTable'

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
    
    return (
    <>
        <div>
            {down ? (
                <div>
                    <h3>Previous down</h3>
                    <DownNavTable previousDown={downs[prevDown]}/>
                </div>
            ) : (<h3>No previous down</h3>)}
            <div style={{display:"flex",width: '100%',justifyContent: "space-between", marginBottom: "2rem"}}>
                {0 < downIndex && (<button  onClick={prev}>Previous</button>)} 
                {maxDowns > downIndex && (<button style={{marginLeft:"auto"}} onClick={next}>Next</button>)}
            </div>
        </div>
    </>
    )
}
