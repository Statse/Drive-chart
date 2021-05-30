import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    marginBottom: "2rem",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  flexCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  },
});

export default function GameCard(props) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.homeScore} {props.home} - {props.away} {props.awayScore}
        </Typography>
      </CardContent>
      <CardActions className={classes.flexCenter}>
        <Button onClick={()=>history.push(`/game/${props.id}`)}color="primary" size="small">Go to game</Button>
      </CardActions>
    </Card>
  );
}