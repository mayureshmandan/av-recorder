const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
var fs = require('fs');

const port = 5000;
const app = express();
const router = express.Router();
const RecordsRepository = require('./db');
const recordsRepo = new RecordsRepository();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(logger('dev'));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
router.post('/save', upload.single('file'), (req, res) => {
  const file = req.file;
  const meta = req.body;
  data = fs.readFileSync(`./files/${file.filename}`);
  const doc = {
    _attachments: {
      blob: {
        content_type: file.mimetype,
        data: data.toString('base64')
      }
    },
    meta
  };
  recordsRepo.create(doc, true).then((doc) => {
    console.log(doc);
    return res.json({ success: true });
  }).catch(err => {
    console.log(err);
    return res.json({ success: false });
  });
})

router.delete('/delete', (req, res) => {
  recordsRepo.get(req.body.id).then((doc) => {
    recordsRepo.delete(doc).then(() => {
      return res.json({ success: true });
    })
  });
});

router.get('/all', (req, res) => {
  recordsRepo.getAll().then((doc) => {
    const data = [];
    doc.rows.forEach(e => {
      data.push(e.doc);
    });
    return res.json({ success: true , data });
  });
});

app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
