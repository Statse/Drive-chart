import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper: {
        position: "relative",
        display: "flex",
        flexFlow: "column",
        minHeight: "100px",
        maxHeight: "300px",
        height: "100%",
        width: "100%",
    },
    fieldContainer: {
        height: "52px",
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
        width: "280px",
        margin: "0.25rem 0"
    },
    long: {
        height:  "80px",
    },
    gridironContainer: {
        position: "relative",
        width: "32%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "flexEnd",
    },
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
    grid: {
        width: "100%",
        height: "100%",
        background: "red",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexFlow: "column"
    },
    gridAxis: {
        position: "absolute",
        left: "-25px",
        width: "20px",
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    yardLine: {
        width: "6px",
        background: "grey",
        height: "2px",
        marginTop: "4px"
    },
    fiveYd: {
        background: "darkgrey",
        width: "10px",
        position: "relative",
        display: ""
    },
    yardNumberWrapper: {
        position: "absolute",
        left:" -25px",
        top: "-4px",
        width: "20px",
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-end"
    },
    yardNumber: {
        fontSize: "0.5rem",
    }
  });

export default function ThrowMap(props) {
    const classes = useStyles();



    // const markers = ['','','LOS','',10,'',20]
    const markers = [30,'',20,'',10,'','LOS','','']

    return (
        <div className={classes.wrapper}>
            <div className={classes.gridAxis}>
                {markers.map((marker)=>{
                    return(
                        <>
                            <div className={classes.yardLine}></div>
                            <div className={classes.yardLine}></div>
                            <div className={classes.yardLine}></div>
                            <div className={classes.yardLine}></div>
                            <div className={`${classes.yardLine} ${classes.fiveYd}`}>
                                <span className={classes.yardNumberWrapper}>
                                    <Typography className={classes.yardNumber}>{marker}</Typography>
                                </span>
                            </div>
                        </>
                        )
                })}
            </div>
            {/* 20+ yards*/}
            <div className={`${classes.fieldContainer} ${classes.long}`}>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
            </div>

            {/* 10-20 yards*/}
            <div className={classes.fieldContainer}>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
            </div>
            
            {/* 0-10 yards*/}
            <div className={classes.fieldContainer}>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
            </div>

            {/* Screens */}
            <div className={classes.fieldContainer}>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid}>
                        </div>
                    </Card>
            </div> 
        </div>
    )
}


function gridiron(){
    const yardline = <>
    
    </>
}