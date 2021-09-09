import { Button, Icon } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import Dialogs from './components/Dialogs';
import PostList from './components/PostList';
import { openDialog } from './redux/actions/dialogAction';
import './styles/App.css';
import { DIALOGS } from './utils/constants';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="App">
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
      <Dialogs />
      <PostList />
    </div>
  );
}

export default App;
