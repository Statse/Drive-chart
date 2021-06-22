import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    yardLine: {
        position: "relative",
        borderLeft: "5px solid #fff",
        width: "10px",
        height: "2px",
        backgroundColor: "#ddd",
        float: "right",
        clear: "both",
        margin: "2px 0",
    },
  });

export default function ThrowMap() {
    return (
        <div>
            <div className="axisContainer">
                <div className="yardLine fiveYd">
                    <span className="yardLine-num"></span>
                </div>
                <div className="yardLine"></div>
                <div className="yardLine"></div>
                <div className="yardLine"></div>
                <div className="yardLine"></div>
            </div>
        </div>
    )
}
