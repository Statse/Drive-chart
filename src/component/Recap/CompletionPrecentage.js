import React from 'react'
import Chart  from 'react-apexcharts'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: "100%",
        flexFlow: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default function CompletionPrecentage(props) {
    const classes = useStyles(); 
    const {game, team} = props
    const {downs} = game

    const completions = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass" && down.result.toLowerCase() !== "incomplete"){
                return down
            }
        }) 
    
    const incompletions = downs.filter((down)=>{
            if (down.possession.toLowerCase() === team && down.playType === "Pass"  && down.result.toLowerCase() === "incomplete"){
                return down
            }
        }) 

    const completePrecentage = Math.round(completions.length / (completions.length + incompletions.length) * 100)
    const incompletePrecentage = Math.round(incompletions.length / (completions.length + incompletions.length) * 100)
    const series = [completePrecentage, incompletePrecentage]

    const options = {
            chart: {
            width: 380,
            type: 'pie',
            },
            labels: ["Complete", "Incomplete"],
            responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
            }]
        }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">Pass completions</Typography>
                <Chart type="pie" options={options} series={series} width={500} height={320} />
            </CardContent>
        </Card>
    )
}
