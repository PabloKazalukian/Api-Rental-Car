import express from 'express';
import controller from '../controllers/carController';


const router = express.Router();



router.get('/', controller.getAllCars);
router.post('/', controller.createCar);


export = router;
