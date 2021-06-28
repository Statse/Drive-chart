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
    minWidth: 650 || "",
  },
});

function createData(down) {
  return { 
      down: down.down || "", 
      distance: down.distance || "", 
      possession: down.possession || "", 
      startYardline: down.startYardline || "", 
      endYardline: down.endYardline || "", 
      playType: down.playType || "", 
      result: down.result || ""
    };
}

export default function DownNavTable(props) {
  const classes = useStyles();
  const {previousDown} = props

  const rows = [createData(previousDown)];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Down</TableCell>
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
                <TableCell align="right">{row.down}</TableCell>
                <TableCell align="right">{row.distance}</TableCell>
                <TableCell align="right">{row.possession}</TableCell>
                <TableCell align="right">{row.startYardline}</TableCell>
                <TableCell align="right">{row.endYardline}</TableCell>
                <TableCell align="right">{row.playType}</TableCell>
                <TableCell align="right">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}