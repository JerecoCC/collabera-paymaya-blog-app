import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BASE_URI } from '../utils/constants';
import Post from './Post';

const useStyles = makeStyles((theme) => ({
  postList: {
    display: "grid",
    gridGap: 10,
    justifyItems: "center",
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: "1fr"
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: "repeat(3, 1fr)"
    },
  }
}));

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const {
    shouldUpdate,
    toggleUpdate,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(shouldUpdate) {
      getPosts();
    }
  // eslint-disable-next-line
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

  return (
    <div className={classes.postList}>
      {posts.map((item, index) => (
        <Post
          key={index}
          data={item}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
}

export default PostList;
