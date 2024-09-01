const multer = require("multer");

// from the documentation
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      return cb(null, "./public/temp");
   },
   filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      return cb(null, `${file.fieldname}-${file.originalname}`);
   },
});

const upload = multer({ storage: storage });
module.exports = { upload };
