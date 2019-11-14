import {
  //action_types
  SAVE_BLOB,
  SAVE_BLOB_ERROR,
  SAVE_BLOB_SUCCESS
} from './actions'

const initialState = {
  blobs: [],
  error: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BLOB:
      return { ...state, error: null }
    case SAVE_BLOB_SUCCESS:
      return { ...state, error: null }
    case SAVE_BLOB_ERROR:
      return { ...state, error: "Error saving audio/video"}
    default:
      return state
  }
}
