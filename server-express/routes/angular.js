var express = require('express');
var router = express.Router();

/* GET static angular UI. */
router.use(
  express.static('./public/angular'),
  (req, res, next) => res.sendFile('index.html', { root: './public/angular' })
)

module.exports = router;
