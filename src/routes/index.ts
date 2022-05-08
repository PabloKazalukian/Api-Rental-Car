import express from 'express';
import controller from '../controllers/carController';

const router = express.Router();

// router.post('/create/book', controller.createBook);
router.get('/car', controller.getAllCars);
router.post('/car', controller.createCar);

export = router;