import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField
} from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import React, { useEffect, useState } from 'react';
import { BASE_URI } from '../../utils/constants';

const useStyles = makeStyles({
  title: {
    marginTop: 5,
    marginBottom: 10
  },
  root: {
    minHeight: 325,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start'
  },
})

const CreatePostDialog = (props) => {
  const {
    onClose,
    open
  } = props;

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if(!open) {
      setImage("");
      setTitle("");
      setContent("");
    }
  }, [open]);

  const createPost = () => {
    const post = {title, content, image};
    fetch(`${BASE_URI}/post`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success");
    })
    .catch(err => {
      console.error(err);
    });
    onClose(true);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <FileBase64
          type="image"
          multiple={false}
          onDone={({base64}) => setImage(base64)}
        />
        <TextField
          id="postTitleInput"
          label="Title"
          className={classes.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="postContentInput"
          placeholder="Place content here..."
          InputProps={{className: classes.root}}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={createPost}
          color="primary"
          variant="contained"
          autoFocus
        >
          Create
        </Button>
        <Button
          onClick={onClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePostDialog;
