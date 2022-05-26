import express from 'express';
import controller from '../controllers/userController';
import {checkJwt} from '../middlewares/jwt';


const router = express.Router();

router.get('/',[checkJwt], controller.getAllUsers);
router.post('/', controller.createUser);


export = router;