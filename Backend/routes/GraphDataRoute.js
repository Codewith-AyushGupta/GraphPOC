const express = require('express');
const router = express.Router();
const getGraphPoints = require("../controllers/GraphPointsControll")

// router.route('/:id').get(getContact).delete(deleteContact);

router.route('/').get(getGraphPoints);


module.exports = router;