import React, { Component } from 'react';
import { record } from './helpers';
import { connect } from 'react-redux';
import { saveBlob } from './actions';
import { saveBlobApi } from './api';
import audioLogo from './audio.svg';

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recorder: null,
      audio: null
    };

    this.record = this.record.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.save = this.save.bind(this);
  }

  record() {
    console.log('Record Function');

    const { recorder } =  this.state;
  
    (async () => {
      if (recorder) {
        const audio = await recorder.stop();
        this.setState({ recorder: null, audio });
      } else {
        const recorder = await record({audio: true});
        this.setState({ recorder });
        if (recorder) {
          recorder.start();
          setTimeout(async () => {
            if (this.state.recorder) {
              const audio = await this.state.recorder.stop();
              this.setState({ recorder: null, audio });
            }
          }, 10400);
        }
      }
    })();
  }

  playAudio() {
    console.log('Playing recorded audio');
    const { audio } =  this.state;
    if (audio) {
      console.log(audio);
      audio.playAudio();
    } else {
      alert("No audio recorded yet");
    }
  }

  save() {
    console.log('saving audio');
    const { audio } = this.state;
    if (audio) {
      // this.props.saveAudio(audio.url)
      console.log('Blob to be saved: ', audio.blob);
      saveBlobApi(audio.blob, 'audio').then(response => {
        console.log(response);
      });
    } else {
      alert('Nothing to save yet')
    }
  }

  render() {
    return (
      <div>
        <img src={audioLogo} className="recorder-logo" alt="audio-logo" />
        <h2>Audio Recording from Microphone</h2>
        <div>
          <button onClick={this.record}>
            {this.state.recorder ? 'Stop' : 'Start'}
          </button>
        </div>
        <div>
          {/* <button onClick={this.playAudio}>Play recorded audio</button> */}
          {this.state.audio ? 
            <audio controls width="320" height="40">
              <source src={this.state.audio.url} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>  : "No audio recorded yet"
        }
        </div>
        <div>
          <button onClick={this.save}>Save audio</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ blobs }) => {
  return { blobs }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAudio: (blob) => dispatch(saveBlob(blob))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioRecorder);
