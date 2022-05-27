import express from 'express';
import controller from '../controllers/carController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role'


const router = express.Router();



// router.get('/', controller.getAllCars);
router.get('/',controller.getAllCars);
router.get('/id/:id',controller.getCarById);

router.post('/',[checkJwt],[checkRole(['admin'])], controller.createCar);


export = router;
