import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function DownNavTable(props) {
  const classes = useStyles();
  const {previousDown} = props

  const rows = [
    createData(
        previousDown.down || null,
        previousDown.distance || null,
        previousDown.possession || null,
        previousDown.startYardline || null,
        previousDown.endYardline || null,
        previousDown.playType || null,
        previousDown.result || null,
        ),
  ];


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Down</TableCell>
            <TableCell align="right">Distance</TableCell>
            <TableCell align="right">Possession</TableCell>
            <TableCell align="right">Start line</TableCell>
            <TableCell align="right">End line</TableCell>
            <TableCell align="right">Play type</TableCell>
            <TableCell align="right">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
                <TableCell align="right">Distance</TableCell>
                <TableCell align="right">Possession</TableCell>
                <TableCell align="right">Start line</TableCell>
                <TableCell align="right">End line</TableCell>
                <TableCell align="right">Play type</TableCell>
                <TableCell align="right">Result</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}