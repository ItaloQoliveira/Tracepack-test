const express = require('express')
const router = express.Router();
const mapController = require('../app/controllers/mapController'); 
const auth = require('../middlewares/auth')

router.post('/point', mapController.postPoint)

router.get('/point', mapController.getPoint)

router.post('/polygon', mapController.postPolygon)

router.get('/polygon', mapController.getPolygon)


module.exports = router;
