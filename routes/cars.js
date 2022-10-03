const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');

router.get('/getCars',controller.getCars);
router.post('/addNewCar',controller.addNewCar);
router.post('/updateCar',controller.updateCar);
router.post('/removeCar',controller.deleteCar);

module.exports = router;