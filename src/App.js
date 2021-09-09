import { Button, Icon } from '@material-ui/core';
import React, { useState } from 'react';
import CreatePostDialog from './components/CreatePostDialog';
import PostList from './components/PostList';
import './styles/App.css';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const [shouldUpdate, toggleUpdate] = useState(false);

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
      <PostList
        shouldUpdate={shouldUpdate}
        toggleUpdate={toggleUpdate}
      />
    </div>
  );
}

export default App;
