import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      flexFlow: "column",
      display: "flex",
      justifyContent: "center",
    },
    table: {
        width: "100%"
    },
});

export default function OffenseStats(props) {
    const {data, heading, description} = props

    const classes = useStyles();

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.root}>
                <CardContent> 
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>{props.heading}</TableCell>
                                <TableCell align="right">{props.description || ""}</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((d)=>(
                                    <TableRow>
                                        <TableCell component="th" scope="row">{d.name}</TableCell>
                                        <TableCell align="right">{d.data}</TableCell>
                                    </TableRow> 
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </CardContent> 
        </Card>
    </Grid>
    )
}
