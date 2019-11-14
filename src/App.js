import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './Reducer';
import saga from './Saga';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import AudioRecorder from './Recorder/audioRecorder';
import VideoRecorder from './Recorder/videoRecorder';
import SavedRecords from './Recorder/savedRecords';

const sagaMiddleware = createSagaMiddleware();
var middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(saga);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="Home">
          <header className="App-header">
            <nav>
              <span><a className="Header-Link" href="/"><span className={window.location.pathname == '/' ? "Header-Tab active" : "Header-Tab"}>Record</span></a></span>
              <span><a className="Header-Link" href="saved" ><span className={window.location.pathname == '/' ? "Header-Tab" : "Header-Tab active"}>Saved Records</span></a></span>
            </nav>
          </header>
        </div>
        <BrowserRouter>
          <div>
            <Route exact={true} path='/' render={() => (
              <Grid fluid>
                <Row>
                  <Col xs={12} sm={6} md={6}>
                    <AudioRecorder />
                  </Col>
                  <Col xs={12} sm={6} md={6}>
                    <VideoRecorder />
                  </Col>
                </Row>
              </Grid>
            )}/>
            <Route exact={true} path='/saved' render={() => (
              <div className="Saved">
                <SavedRecords />
              </div>
            )}/>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
