import { Button, Icon, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import Dialogs from './components/Dialogs';
import PostList from './components/PostList';
import { openDialog } from './redux/actions/dialogAction';
import './styles/App.css';
import { DIALOGS } from './utils/constants';

const useStyles = makeStyles({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "#fff",
    zIndex: 2,
    borderBottom: "1px solid #d6d6d6",
  },
  headerContent: {
    maxWidth: 960,
    padding: 15,
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    padding: 15,
    maxWidth: 960,
    margin: "auto",
    marginTop: 66,
  }
});

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <Typography variant="h5">
            Blog
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon>add</Icon>}
            onClick={() => {
              dispatch(openDialog(DIALOGS.CREATE_POST));
            }}
          >
            Create Post
          </Button>
        </div>
      </div>
      <div className={classes.body}>
        <Dialogs />
        <PostList />
      </div>
    </div>
  );
}

export default App;
