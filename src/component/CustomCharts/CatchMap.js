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
        background: "purple",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
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
    },
    fontSmall: {
        fontSize: "0.7rem",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: "1rem"
    },
  });

export default function ThrowMap(props) {
    const classes = useStyles();

    const {zones, totalCatches} = props

    const markers = [30,'',20,'',10,'','LOS','','']


    const zoneHtml  = zones.map((zone, index)=>{
        let hashes = zone.map((hash)=>{

                const ratio = hash.catch / totalCatches
                const opacity = ratio ? ratio : 0

                return (  
                    <Card className={classes.gridironContainer}>
                        <div className={classes.grid} style={{backgroundColor: `rgba(154, 18, 179, ${opacity})`}}>
                            <Typography className={classes.fontSmall}>{hash.yards} Yards</Typography>
                            <Typography className={classes.fontSmall}>{hash.catch} Catches</Typography>
                            {hash.td > 0 && <Typography className={classes.fontSmall}>{hash.td} TD</Typography>}
                            {hash.int > 0 && <Typography className={classes.fontSmall}>{hash.int} Int</Typography>}
                        </div>
                    </Card>
                )
        })

        const cssClasses = index < 1 ? `${classes.fieldContainer} ${classes.long}` : classes.fieldContainer

        return (
            <div className={cssClasses}>
               {hashes}
            </div>
        )
    })

    return (
        <div>  
            <Typography className={classes.title}>Catch zones</Typography>
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

                {zoneHtml}
            </div>
        </div>
    )
}