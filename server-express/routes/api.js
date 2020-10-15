var express = require('express');
var router = express.Router();

/* GET data from the server using /api path. */
router.use(
  (req, res, next) => res.send('some data from the server')
);

module.exports = router;
