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
import { useDispatch } from 'react-redux';
import { shouldUpdateList } from '../../redux/actions/postAction';

const useStyles = makeStyles({
  title: {
    marginTop: 5,
    marginBottom: 10
  },
  root: {
    minHeight: 280,
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

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    image: "",
    title: "",
    content: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!open) {
      setFormData({
        image: "",
        title: "",
        content: "",
      });
      setErrors({
        image: "",
        title: "",
        content: "",
      });
    }
  }, [open]);

  const setInputData = (name, data) => {
    setFormData((prev) => ({
      ...prev,
      [name]: data,
    }));
  }

  const setErrorMessages = (name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  const validate = () => {
    let hasError = false;
    if(!formData.title.trim()) {
      setErrorMessages("title", "Title is required");
      hasError = true;
    }
    if(!formData.content.trim()) {
      setErrorMessages("content", "Content is required");
      hasError = true;
    }

    return !hasError;
  }

  const createPost = () => {
    if(validate()) {
      const post = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        image: formData.image,
      }
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
        dispatch(shouldUpdateList(true));
      })
      .catch(err => {
        console.error(err);
      });
      onClose(true);
    }
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
          onDone={({base64}) => setInputData("image", base64)}
        />
        <TextField
          error={!!errors?.title}
          helperText={errors?.title}
          id="postTitleInput"
          label="Title"
          className={classes.title}
          value={formData.title}
          onChange={(e) => setInputData("title", e.target.value)}
          fullWidth
          required
        />
        <TextField
          error={!!errors?.content}
          helperText={errors?.content}
          id="postContentInput"
          label="Content"
          placeholder="Place content here..."
          InputProps={{className: classes.root}}
          value={formData.content}
          onChange={(e) => setInputData("content", e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          required
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
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePostDialog;
