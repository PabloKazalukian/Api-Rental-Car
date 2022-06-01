import express from 'express';
import controller from '../controllers/requestController';
import {checkJwt} from '../middlewares/jwt';
import {checkRole} from '../middlewares/role'


const router = express.Router();



router.get('/all',[checkJwt],[checkRole(['admin'])], controller.getAllRequest);
router.post('/',[checkJwt], controller.createRequest);


export = router;