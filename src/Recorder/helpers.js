const record = (options) => {
  return new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => {
      mediaRecorder.start();
      console.log('recording started', mediaRecorder);
    }

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          let blob;
          if (options.video) {
            blob = new Blob(audioChunks, {'type': 'video/webm'});
          } else {
            blob = new Blob(audioChunks, {'type': 'audio/webm;codecs=opus'});
          }
          blob.lastModifiedDate = new Date();
          blob.name = "blobfile";
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          const playAudio = () => audio.play();
          resolve({ blob, url, playAudio });
        });

        mediaRecorder.stop();
        console.log('recording stopped', mediaRecorder);
      });

    resolve({ start, stop });
  });
}

const convertURIToBinary = (dataURI) => {
  let base64 = dataURI.substring(dataURI);
  let raw = atob(base64);
  let rawLength = raw.length;
  let arr = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
}

export { record, convertURIToBinary };
