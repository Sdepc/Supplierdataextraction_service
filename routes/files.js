var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });


/* GET Files listing. */
router.get('/', function (req, res, next) {
    res.send('Files');
});

router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});




module.exports = router;
