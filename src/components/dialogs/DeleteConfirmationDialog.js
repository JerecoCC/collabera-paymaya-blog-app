import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../redux/actions/dialogAction';
import { shouldUpdateList } from '../../redux/actions/postAction';
import { BASE_URI } from '../../utils/constants';

const DeleteConfirmationDialog = (props) => {
  const selectedPost = useSelector(state => state.post.selectedId);
  const dispatch = useDispatch();

  const {
    onClose,
    open
  } = props;

  const handleDelete = () => {
    fetch(`${BASE_URI}/post/${selectedPost}`, {method: "DELETE"})
      .then(res => dispatch(shouldUpdateList(true)));
    dispatch(closeDialog());
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="confirmation-dialog-title">
        Delete Post
      </DialogTitle>
      <DialogContent>
        Are you sure you want to delete this post?
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          onClick={handleDelete}
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationDialog;