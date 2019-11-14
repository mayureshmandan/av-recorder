const PouchDB = require('pouchdb');
const db = new PouchDB('records');

class RecordsRepository {
  create(doc) {
    return db.post(doc);
  }

  getAll() {
    return db.allDocs({ include_docs: true, descending: true, attachments: true });
  }

  get(id) {
    return db.get(id);
  }

  delete(doc) {
    return db.remove(doc);
  }
}

module.exports = RecordsRepository;
