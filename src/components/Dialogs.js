import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../redux/actions/dialogAction';
import { DIALOGS } from '../utils/constants';
import CreatePostDialog from './dialogs/CreatePostDialog';
import DeleteConfirmationDialog from './dialogs/DeleteConfirmationDialog';

const Dialogs = () => {
  const dialogName = useSelector(state => state.dialog.name);
  const dispatch = useDispatch();

  const shouldOpen = (name) => {
    return dialogName === name;
  } 

  return (
    <React.Fragment>
      <CreatePostDialog
        open={shouldOpen(DIALOGS.CREATE_POST)}
        onClose={() => dispatch(closeDialog())}
      />
      <DeleteConfirmationDialog
        open={shouldOpen(DIALOGS.DELETE_POST)}
        onClose={() => dispatch(closeDialog())}
      />
    </React.Fragment>
  );
}

export default Dialogs;
