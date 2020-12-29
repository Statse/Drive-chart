import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import DownListHeader from './DownListHeader'

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
        <DownListHeader></DownListHeader>
      </div>
  );
}