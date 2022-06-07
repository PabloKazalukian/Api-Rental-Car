import express from 'express';
import controller from '../controllers/requestController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role'


const router = express.Router();



router.get('/all',[checkJwt],[checkRole(['admin'])], controller.getAllRequest);
router.get('/allOfCarId/:idCar',[checkJwt], controller.getAllRequestByIdCar);
router.get('/allOfUserId/:userId',[checkJwt], controller.getAllRequestByUserId);
router.post('/',[checkJwt], controller.createRequest);



export = router;