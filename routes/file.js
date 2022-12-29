const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../register');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    }
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile');

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if(!req.file) {
        console.log('error');
      }
      if (err) {
        return res.status(500).send({ error: err.message });
      }
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        res.render('home', { file: `http://localhost:3000/files/${response.uuid}` });
      });
});


module.exports = router;
