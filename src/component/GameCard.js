import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button';

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

  const {downs} = props.game

  console.log(props.game.downs)



  let index = downs.length

  if (downs[downs.length - 1].playType === "Game end"){
    index = downs.length - 1
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.game.home} - {props.game.away}
        </Typography>
      </CardContent>
      <CardActions className={classes.flexCenter}>
        <Button onClick={()=>history.push(`/game/${props.game.id}/${index}`)} variant="contained" color="primary" size="small">Log game</Button>
        <Button onClick={()=>history.push(`/recap/${props.game.id}`)} variant="contained" color="secondary" size="small">Recap</Button>
      </CardActions>
    </Card>
  );
}