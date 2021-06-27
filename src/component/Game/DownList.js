import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DriveChartNav from './DriveChart/DownAccordion'
import SeriesMappers from '../../helpers/Series';


const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  relative:{
    position: "relative"
  }
});

export default function DownList(props) {
  const {downs, handleDownIndex} = props
  const classes = useStyles();
  console.log(downs)
  const series = SeriesMappers(downs)
  console.log(series)
  return (
      <div className={classes.relative}>
            {
                (series.map((singleSeries, index)=>{
                    return <DriveChartNav key={index} handleDownIndex={handleDownIndex} series={singleSeries} seriesIndex={index}/>
                }))
            }
      </div>
  );
}