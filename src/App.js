import { Button, Icon, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CreatePostDialog from './components/CreatePostDialog';
import Post from './components/Post';
import './styles/App.css';
import { BASE_URI } from './utils/constants';

const useStyles = makeStyles({
  posts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
});

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [shouldUpdate, toggleUpdate] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if(shouldUpdate) {
      getPosts();
    }
  }, [shouldUpdate]);

  const getPosts = () => {
    fetch(`${BASE_URI}/post`)
      .then(res => res.json())
      .then(res => setPosts(res));
    toggleUpdate(false);
  }

  const deletePost = (id) => {
    fetch(`${BASE_URI}/post/${id}`, {method: "DELETE"})
      .then(res => toggleUpdate(true));
  }

  const handleClose = (update = false) => {
    setOpen(false);
    toggleUpdate(update);
  }

  return (
    <div className="App">
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Icon>add</Icon>}
        onClick={() => setOpen(true)}
      >
        Create Post
      </Button>
      <CreatePostDialog
        open={isOpen}
        onClose={handleClose}
      />
      <div className={classes.posts}>
        {posts.map((item, index) => (
          <Post
            key={index}
            data={item}
            onDelete={deletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
