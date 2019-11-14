import { combineReducers } from 'redux';
import { reducer } from './Recorder/reducer';

const combinedReducer = combineReducers({
  blobs: reducer
});

export default combinedReducer;
