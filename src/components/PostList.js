import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
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
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  }
}));

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
    fetch(`${BASE_URI}/post?page=${currentPage}&perPage=${3}`)
      .then(res => res.json())
      .then(res => {
        dispatch(shouldUpdateList(false));
        setPosts(res.posts);
        setPages(res.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    dispatch(shouldUpdateList(true));
  }

  return (
    <React.Fragment>
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
      <div className={classes.pagination}>
        <Pagination count={pages} onChange={handlePageChange} />
      </div>
    </React.Fragment>
  );
}

export default PostList;
