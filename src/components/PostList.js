import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy, shouldUpdateList } from "../redux/actions/postAction";
import { BASE_URI, SORT_BY } from "../utils/constants";
import KeywordSearch from "./KeywordSearch";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    textAlign: "initial",
  },
  postList: {
    display: "grid",
    gridGap: 10,
    justifyItems: "center",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const shouldUpdate = useSelector(state => state.post.updateList);
  const sortBy = useSelector(state => state.post.sortBy);
  const keyword = useSelector(state => state.post.keyword);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      getPosts();
    }
    // eslint-disable-next-line
  }, [shouldUpdate]);

  const getPosts = () => {
    setLoading(true);
    const params = `page=${currentPage}&perPage=${3}&sortBy=${sortBy}&keyword=${keyword}`;
    fetch(`${BASE_URI}/post?${params}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(shouldUpdateList(false));
        setPosts(res.posts);
        setPages(res.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    dispatch(shouldUpdateList(true));
  };

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
    dispatch(shouldUpdateList(true));
  }

  return (
    <React.Fragment>
      <div className={classes.header}>
        <KeywordSearch />
        <FormControl
          className={classes.formControl}
          size="small"
        >
          <InputLabel id="sortByLabel">Sort By</InputLabel>
          <Select
            labelId="sortByLabel"
            id="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            className={classes.selectEmpty}
          >
            <MenuItem value={SORT_BY.TITLE}>Title</MenuItem>
            <MenuItem value={SORT_BY.DATE_CREATED}>Date Created</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.postList}>
        <Backdrop open={isLoading} className={classes.backdrop}>
          <CircularProgress color="primary" />
        </Backdrop>
        {posts.map((item, index) => (
          <Post key={index} data={item} />
        ))}
      </div>
      {pages > 1 &&
        <div className={classes.pagination}>
          <Pagination count={pages} onChange={handlePageChange} />
        </div>
      }
    </React.Fragment>
  );
};

export default PostList;
