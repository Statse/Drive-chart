import React from 'react'

export default function downNavigation(props) {
    const {downs} = props
    return (
        <div>
        <h3>Previous down</h3>
        <table style={{width:"100%", marginBottom:"3rem"}}>
            <tr style={{display:"flex",
                        width: '100%',
                        justifyContent: "space-between"}
                        }>
                <th>Down</th>
                <th>Distance</th>
                <th>Start line</th>
                <th>End line</th>
                <th>Possession</th>
                <th>Result</th>
            </tr>
            <tr style={{display:"flex",
                        width: '100%',
                        justifyContent: "space-between"}
                        }>
                <td>{downs[downs.length-1].down}</td>
                <td>{downs[downs.length-1].distance}</td>
                <td>{downs[downs.length-1].startYardline}</td>
                <td>{downs[downs.length-1].endYardline}</td>
                <td>{downs[downs.length-1].possession}</td>
                <td>{downs[downs.length-1].result}</td>
            </tr>
        </table>
    </div>
    )
}
