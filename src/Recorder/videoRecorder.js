import React, { Component } from 'react';
import { record } from './helpers';
import { connect } from 'react-redux';
import { saveBlob } from './actions';
import { saveBlobApi } from './api';
import videoLogo from './video.svg';

class VideoRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recorder: null,
      video: null
    };

    this.record = this.record.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.save = this.save.bind(this);
  }

  record() {
    console.log('Record Function');

    const { recorder } =  this.state;
  
    (async () => {
      if (recorder) {
        const video = await recorder.stop();
        this.setState({ recorder: null, video });
      } else {
        const recorder = await record({audio: true, video: true});
        this.setState({ recorder });
        console.log(recorder);
        if (recorder) {
          recorder.start();
          setTimeout(async () => {
            if (this.state.recorder) {
              const video = await this.state.recorder.stop();
              this.setState({ recorder: null, video });
            }
          }, 10400);
        }
      }
    })();
  }

  playVideo() {
    console.log('Playing recorded audio');
    const { video } =  this.state;
    const player = document.getElementById('player');
    if (video) {
      player.src = video.url;
    } else {
      alert("No video recorded yet");
    }
  }

  save() {
    console.log('saving video');
    const { video } = this.state;
    if (video) {
      this.props.saveVideo(video.url)
      saveBlobApi(video.blob, 'video').then(response => {
        console.log(response);
      });
    } else {
      alert('Nothing to save yet')
    }
  }

  render() {
    return (
      <div>
        <img src={videoLogo} className="recorder-logo" alt="video-logo" />
        <h2>Video Recording from WebCam</h2>
        <div>
          <button onClick={this.record}>
            {this.state.recorder ? 'Stop' : 'Start'}
          </button>
        </div>
        <div>
        {this.state.video ?
          <video width="320" height="200" id="player" controls onPlay={this.playVideo}>
            <source src={this.state.video.url} />
            Your browser does not support the video element.
          </video> : "No video recorded yet"
        }
        </div>
        <div>
          <button onClick={this.save}>Save video</button>
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
    saveVideo: (blob) => dispatch(saveBlob(blob))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoRecorder);
