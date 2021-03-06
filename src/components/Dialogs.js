import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../redux/actions/dialogAction';
import { DIALOGS } from '../utils/constants';
import CreateEditPostDialog from './dialogs/CreateEditPostDialog';
import DeleteConfirmationDialog from './dialogs/DeleteConfirmationDialog';
import ViewPostDialog from './dialogs/ViewPostDialog';

const Dialogs = () => {
  const dialogName = useSelector(state => state.dialog.name);
  const dispatch = useDispatch();

  const shouldOpen = (name) => {
    return dialogName === name;
  }
  
  const onClose = () => {
    dispatch(closeDialog());
  }

  return (
    <React.Fragment>
      <CreateEditPostDialog
        open={shouldOpen(DIALOGS.CREATE_POST) || shouldOpen(DIALOGS.EDIT_POST)}
        onClose={onClose}
      />
      <DeleteConfirmationDialog
        open={shouldOpen(DIALOGS.DELETE_POST)}
        onClose={onClose}
      />
      <ViewPostDialog
        open={shouldOpen(DIALOGS.VIEW_POST)}
        onClose={onClose}
      />
    </React.Fragment>
  );
}

export default Dialogs;
