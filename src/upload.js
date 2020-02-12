import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path.join(__dirname,'../','uploads')}`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).array('file')

export const uploadMiddleware = (req,res,next) => {
  upload(req, res, function (err) {
    if (err) return res.status(500).json(err);
    next();
  })
};

export const uploadController = (req, res) => {
  const {files} = req;
  const path = []
  files.map( (file) => path.push(file.path) ) 
  // console.log(path);

  return res.status(200).json(path);
};