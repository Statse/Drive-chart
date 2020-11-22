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

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DownList(props) {
  const {downs} = props
  const classes = useStyles();

  console.log(rows)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">QTR</TableCell>
            <TableCell align="right">Down</TableCell>
            <TableCell align="right">Distance</TableCell>
            <TableCell align="right">Play type</TableCell>
            <TableCell align="right">Yard result</TableCell>
            <TableCell align="right">Result</TableCell>
            <TableCell align="right">Coverage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="">
                Patriots
              </TableCell>
              <TableCell component="th" align="right">
                1
              </TableCell>
              <TableCell component="th" align="right">
                10
              </TableCell>
              <TableCell align="right">5</TableCell>
              <TableCell align="right">Run</TableCell>
              <TableCell align="right">-3</TableCell>
              <TableCell align="right">Fumble</TableCell>
              <TableCell align="right">???</TableCell>
            </TableRow>
          {downs.map((down) => (
            <TableRow key={down}>
              <TableCell component="th" scope="">
                {}
              </TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}