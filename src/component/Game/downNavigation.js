import React from 'react'

export default function downNavigation(props) {
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
                <>
                    <h3>Previous down</h3>
                    <table style={{width:"100%", marginBottom:"3rem"}}>
                        <tbody>
                            <tr style={{display:"flex",
                                        width: '100%',
                                        justifyContent: "space-between"}
                                        }>
                                <th>Down</th>
                                <th>Distance</th>
                                <th>Possession</th>
                                <th>Start line</th>
                                <th>End line</th>
                                <th>Play type</th>
                                <th>Result</th>
                            </tr>
                            <tr style={{display:"flex",
                                        width: '100%',
                                        justifyContent: "space-between"}
                                        }>
                                <td>{downs[prevDown].down || null}</td>
                                <td>{downs[prevDown].distance}</td>
                                <td>{downs[prevDown].possession}</td>
                                <td>{downs[prevDown].startYardline}</td>
                                <td>{downs[prevDown].endYardline}</td>
                                <td>{downs[prevDown].playType}</td>
                                <td>{downs[prevDown].result}</td>
                            </tr>
                        </tbody>
                    </table> 
                </>
            ) : (<h3>No previous down</h3>)}
            <div style={{display:"flex",width: '100%',justifyContent: "space-between", marginBottom: "2rem"}}>
                {0 < downIndex && (<button  onClick={prev}>Previous</button>)} 
                {maxDowns > downIndex && (<button style={{marginLeft:"auto"}} onClick={next}>Next</button>)}
            </div>
        </div>
    </>
    )
}
