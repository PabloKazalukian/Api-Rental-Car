import express from 'express';
import controller from '../controllers/paymentController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role'


const router = express.Router();



router.get('/all',[checkJwt],[checkRole(['admin'])], controller.getAllPayment);
// router.post('/',[checkJwt], controller.createRequest);


export = router;