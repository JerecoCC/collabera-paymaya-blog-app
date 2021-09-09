import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shouldUpdateList } from '../redux/actions/postAction';
import { BASE_URI } from '../utils/constants';
import Post from './Post';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
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

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const shouldUpdate = useSelector(state => state.post.updateList);
  const dispatch = useDispatch();
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
    setLoading(true);
    fetch(`${BASE_URI}/post`)
      .then(res => res.json())
      .then(res => {
        dispatch(shouldUpdateList(false));
        setPosts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <div className={classes.postList}>
      <Backdrop open={isLoading} className={classes.backdrop}>
        <CircularProgress color="primary" />
      </Backdrop>
      {posts.map((item, index) => (
        <Post
          key={index}
          data={item}
        />
      ))}
    </div>
  );
}

export default PostList;
