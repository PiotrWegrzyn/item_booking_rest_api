let express = require('express');
let router = express.Router();
const reservationController = require("../controllers/reservation")
let checkAuth = require("../middleware/check-auth");

router.post('/create',checkAuth,reservationController.create);

router.get('/all',reservationController.getAll);



module.exports = router;
