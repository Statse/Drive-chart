import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexFlow: "column",
        minHeight: "100px",
        maxHeight: "300px",
        height: "100%",
        width: "100%",
    },
    barContainer: {
        position: "relative",
        width: "23%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "flexEnd",
    },
    bar: {
        width: "100%",
        height: "200px",
        backgroundImage: "linear-gradient(0deg,#ddd,#fff)",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexFlow: "column"
    },
    gapsContainer: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
        width: "280px",
    },
    olineWrapper: {
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
    },
    lineman:{
        margin: "0 0.5rem",
        height: "1.25rem",
        width: "1.25rem",
        fontSize: "0.75rem"
    },
    fontSmall: {
        fontSize: "0.75rem",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: "1rem"
    },
    value: {
        width: "100%",
        background: "Purple"
    },
});

export default function RunMap(props) {
    const classes = useStyles();

    const {totalRuns, totalYards, gaps} = props

    const multiplier = 1.4
    
    return (
            <div className={classes.wrapper}>
                <Typography className={classes.title}>Yards by Rush Direction</Typography>
                <div className={classes.gapsContainer}>
                    <Card className={classes.barContainer}>
                        <div className={classes.bar}>
                            <Typography className={classes.fontSmall}>{gaps["OL"].attempts} ATT</Typography>
                            <Typography className={classes.fontSmall}>{gaps["OL"].yards} yards</Typography>
                            <Typography className={classes.fontSmall}>{gaps["OL"].td} TD</Typography>
                            <div className={classes.value} style={{height: (gaps["OL"].yards*multiplier)+"px" }}></div>
                        </div>
                    </Card>
                    <Card className={classes.barContainer}>
                        <div className={classes.bar}>
                            <Typography className={classes.fontSmall}>{gaps["IL"].attempts} ATT</Typography>
                            <Typography className={classes.fontSmall}>{gaps["IL"].yards} yards</Typography>
                            <Typography className={classes.fontSmall}>{gaps["IL"].td} TD</Typography>
                            <div className={classes.value} style={{height: (gaps["IL"].yards*multiplier)+"px" }}></div>
                        </div>
                    </Card>
                    <Card className={classes.barContainer}>
                        <div className={classes.bar}>
                            <Typography className={classes.fontSmall}>{gaps["IR"].attempts} ATT</Typography>
                            <Typography className={classes.fontSmall}>{gaps["IR"].yards} yards</Typography>
                            <Typography className={classes.fontSmall}>{gaps["IR"].td} TD</Typography>
                            <div className={classes.value} style={{height: (gaps["IR"].yards*multiplier)+"px" }}></div>
                        </div>
                    </Card>
                    <Card className={classes.barContainer}>
                        <div className={classes.bar}>
                            <Typography className={classes.fontSmall}>{gaps["OR"].attempts} ATT</Typography>
                            <Typography className={classes.fontSmall}>{gaps["OR"].yards} yards</Typography>
                            <Typography className={classes.fontSmall}>{gaps["OR"].td} TD</Typography>
                            <div className={classes.value} style={{height: (gaps["OR"].yards*multiplier)+"px" }}></div>
                        </div>
                    </Card>
                </div>
                <div container spacing={3} className={classes.olineWrapper}>
                    <Avatar className={classes.lineman}>LT</Avatar>
                    <Avatar className={classes.lineman}>LG</Avatar>
                    <Avatar className={classes.lineman}>C</Avatar>
                    <Avatar className={classes.lineman}>RG</Avatar>
                    <Avatar className={classes.lineman}>RT</Avatar>
                </div>
            </div>
    )
}
