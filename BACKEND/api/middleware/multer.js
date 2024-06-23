const multer = require('multer');


// from the documentation
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './api/public/temp')
   },
   filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      cb(null, file.originalname)
   }
})

const upload = multer({ storage: storage })
module.exports = upload