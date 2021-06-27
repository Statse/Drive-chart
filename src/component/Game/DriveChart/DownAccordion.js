import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DriveTable from './DriveTable'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: "0.5rem",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      marginRight: "1rem"
    },
  }));

export default function DownAccordion(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {series, editDown} = props

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  let result = ""

  const lastDownInSeries = series[series.length-1]

  if (lastDownInSeries.playType === "PAT"){
        if (series.length > 2){
            result = series[series.length-2].result
        }
  } else if (lastDownInSeries.playType.toLowerCase() === "punt") {
    result = "Punt"
  } else if (lastDownInSeries.result.toLowerCase() === "interception"){
    result = "Interception"
  } else if (lastDownInSeries.distance > lastDownInSeries.endYardline - lastDownInSeries.startYardline){
    result = lastDownInSeries.result
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Possession: {series[series.length-1].possession}</Typography>
          <Typography className={classes.secondaryHeading}>Drive result: {result}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DriveTable downs={series} editDown={editDown} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
