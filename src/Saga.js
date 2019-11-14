import { fork } from 'redux-saga/effects';
import { blobsWatcherSaga } from './Recorder/saga';

export default function* saga() {
  yield [fork(blobsWatcherSaga)];
}
