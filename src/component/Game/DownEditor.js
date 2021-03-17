import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import GameForm from './GameForm'

export default function DownEditor(props) {
  const { onClose, down, open, matchId } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="down-editor-title" open={open}>
      <DialogTitle id="down-editor-title">Edit Down</DialogTitle>
      <GameForm matchId={matchId} down={down}></GameForm>
    </Dialog>
  );
}