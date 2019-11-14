import { takeLatest, call, put } from "redux-saga/effects"

import { 
  // action types
  // FETCH_BLOBS,
  SAVE_BLOB,
  // DELETE_BLOB,
  // action creators
  // fetchBlobsSuccessful,
  // fetchBlobsFailed,
  saveBlobSuccessful,
  saveBlobFailed,
  // deleteBlobSuccessful,
  // deleteBlobFailed,
} from './actions'
import { saveBlobApi } from './api'

// Worker Saga: save blob when watcher saga sees SAVE_BLOB action
function* saveBlobWorkerSaga(action) {
  try {
    console.log('inside save blob worker saga')
    const data = yield call(saveBlobApi, action.blob)

    // dispatch a success action to the store with the data
    yield put(saveBlobSuccessful(data))
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put(saveBlobFailed(error.message))
  }
}


// Watcher Saga: watches for actions dispatched to the store, starts worker saga
export function* blobsWatcherSaga() {
  yield takeLatest(SAVE_BLOB, saveBlobWorkerSaga)
}
