let express = require('express');
let router = express.Router();
const itemController = require("../controllers/item")

router.post('/create',itemController.create);

router.post('/add-reservation',itemController.addReservation);

router.get('/all',itemController.getAll);


module.exports = router;
