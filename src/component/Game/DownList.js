import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//downlist components
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
        <DownListHeader downs={downs}></DownListHeader>
      </div>
  );
}