import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//downlist components
import DownListHeader from './DownListHeader'


function createData(id, personel, QTR, down, distance, yardLine, playType, gain, result) {
  return {id, personel, QTR, down, distance, yardLine, playType, gain, result };
}

function downsToDataRows(downs){
  let downArr = []
  for (let i = 0; i<downs.length; i++){
    // const gain =  downs[i].
    downArr[i] = createData(i, downs[i].personel, downs[i].qtr,  downs[i].down, "yardline", downs[i].playType, "calc",  downs[i].result)
  }
  return downArr
}


const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  relative:{
    position: "relative"
  }
});

export default function DownList(props) {
  const {downs} = props
  const classes = useStyles();

  return (
      <div className={classes.relative}>
        <DownListHeader downs={downsToDataRows(downs)}></DownListHeader>
      </div>
  );
}