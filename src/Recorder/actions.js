// action types
export const SAVE_BLOB = 'SAVE_BLOB'
export const SAVE_BLOB_SUCCESS = 'SAVE_BLOB_SUCCESS'
export const SAVE_BLOB_ERROR = 'SAVE_BLOB_ERROR'

// action creators
export function saveBlob(blob) {
  console.log('inside action')

  return { type: SAVE_BLOB, blob }
}

export function saveBlobSuccessful() {
  return { type: SAVE_BLOB_SUCCESS }
}

export function saveBlobFailed() {
  return { type: SAVE_BLOB_ERROR }
}
