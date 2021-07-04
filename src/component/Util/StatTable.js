import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
      minWidth: 0,
    },
  });

export default function OffenseStats(props) {
    const {data, heading, description} = props

    const classes = useStyles();

    return (
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
    )
}
