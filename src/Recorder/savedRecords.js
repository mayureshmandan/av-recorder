import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { fetchBlobsApi, deleteBlobApi } from './api';
import styles from './recorder.css';
import { convertURIToBinary } from './helpers';


class Player extends Component {
  render() {
    // eslint-disable-next-line
    if (this.props.meta.type == 'audio') {
      let binary = convertURIToBinary(this.props._attachments.blob.data);
      let blob = new Blob([binary], {
        type: 'audio/webm'
      });
      let url = URL.createObjectURL(blob);
      return (
        <audio controls>
          <source width="320" height="40" src={url} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      )
    }
    let binary = convertURIToBinary(this.props._attachments.blob.data);
    let blob = new Blob([binary], {
      type: 'video/webm'
    });
    let url = URL.createObjectURL(blob);
    return (
      <video width="320" height="240" controls onPlay={this.playVideo}>
        <source src={url} type="video/webm" />
        Your browser does not support the video element.
      </video>
    )
  }
}


class SavedRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobs: [],
      loading: true
    };
    this.getBlobs = this.getBlobs.bind(this);
  }

  componentDidMount() {
    this.getBlobs();
  }

  getBlobs() {
    this.setState({ loading: true });
    fetchBlobsApi().then((response) => {
      this.setState({ blobs: response.data });
      console.log("fetched blobs:", this.state.blobs);
      this.setState({ loading: false });
    })
  }

  deleteBlob(id) {
    console.log('deleting blob: ', id)
    deleteBlobApi(id).then((response) => {
      console.log(response);
      console.log("blob deleted:", id);
      this.getBlobs();
    })
  }

  render() {
    const savedRecords = this.state.blobs && this.state.blobs.length > 0 ? this.state.blobs.map((item, index) => {
      return (
        <div key={index} className={styles.card}>
          <Player {...item} />
           {/* eslint-disable-next-line */}
          <div>{index+1}) {item.meta.type == 'audio'? "Audio":"Video"} {item._id} &nbsp;&nbsp;<FontAwesomeIcon icon={faTrashAlt} color="#B53737" onClick={()=>this.deleteBlob(item._id)} /></div>
          <br />
          <br />
        </div>
      )
    }) : <div>Wow, such empty!</div>

    return (
      <div>
        <h2>Saved Records</h2>
        {this.state.loading ? <div>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div> : <div>
          {savedRecords}
        </div>}
      </div>
    )
  }
}

export default SavedRecords;
