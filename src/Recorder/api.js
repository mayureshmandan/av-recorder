import axios from 'axios';

export const saveBlobApi = (file, type ) => {  
  let data = new FormData();
  data.append('file', file);
  data.append('type', type);
  return new Promise((resolve, reject) => {
    axios.post('/api/save', data)
      .then(response =>
        response.status === 200
          ? resolve(response.data)
          : reject(response.data)
      )
      .catch(error => reject(error));
  });
}

export const deleteBlobApi = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/delete`, {data: {id}})
    .then(response =>
      response.status === 200
        ? resolve(response.data)
        : reject(response.data)
    )
    .catch(error => reject(error));
  });
}

export const fetchBlobsApi = async () => {
  console.log('fetching all blobs')
  let apiEndpoint = `/api/all`;

  return new Promise((resolve, reject) => {
    console.log('Fetch blobs');
    fetch(
      apiEndpoint,
      {
        method: "GET"
      }
    )
    .then(response => {
      console.log('Response from  server: ', response)
      return response.status === 200
        ? response.json().then(res => resolve(res))
        : response.json().then(res => reject(res))
      }
    )
    .catch(error => reject(error));
  })
}
