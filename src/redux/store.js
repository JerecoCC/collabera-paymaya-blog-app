import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './reducers/dialogReducer';
import postReducer from './reducers/postReducer';

export default configureStore({
  reducer: {
    dialog: dialogReducer,
    post: postReducer
  }
})