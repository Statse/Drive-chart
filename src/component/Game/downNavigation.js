import React from 'react'

export default function downNavigation(props) {
    const {down, maxDowns, downIndex, setDownIndex} = props

    console.log(props)
    return (
        <div>
        <h3>Previous down</h3>
        <div style={{display:"flex",
                    width: '100%',
                    justifyContent: "space-between"}
                    }>
                    {0 < downIndex && (<button  onClick={()=>alert("prev func")}>Previous</button>)} 
                    {maxDowns > downIndex && (<button style={{marginLeft:"auto"}} onClick={()=>alert("Next func")}>Next</button>)} 

        </div>
        <table style={{width:"100%", marginBottom:"3rem"}}>
            <tr style={{display:"flex",
                        width: '100%',
                        justifyContent: "space-between"}
                        }>
                <th style={{border: "1px solid black"}}>Down</th>
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
                <td>{down.down}</td>
                <td>{down.distance}</td>
                <td>{down.possession}</td>
                <td>{down.startYardline}</td>
                <td>{down.endYardline}</td>
                <td>{down.playType}</td>
                <td>{down.result}</td>
            </tr>
        </table>
    </div>
    )
}
