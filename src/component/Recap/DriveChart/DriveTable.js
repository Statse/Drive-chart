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

function createData(down, distance, direction, playType, result) {
  return { 
      down, 
      distance, 
      direction,
      playType, 
      result, 
    };
}
export default function DriveTable(props) {
  const classes = useStyles();
  const {downs} = props
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quarter</TableCell>
            <TableCell>Possession</TableCell>
            <TableCell>Down</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Gain</TableCell>
            <TableCell>Rusher/Rec</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Gap</TableCell>
            <TableCell>Play type</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {downs.map((down, index) => (
            <TableRow key={index}>
            <TableCell>{down.quarter}</TableCell>
              <TableCell>{down.possession}</TableCell>
              <TableCell>{down.down}</TableCell>
              <TableCell>{down.distance}</TableCell>
              <TableCell>{down.endYardline - down.startYardline}</TableCell>
              <TableCell>{down.carrier}</TableCell>
              <TableCell>{down.playDirection}</TableCell>
              <TableCell>{down.runGap}</TableCell>
              <TableCell>{down.playType}</TableCell>
              <TableCell>{down.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}