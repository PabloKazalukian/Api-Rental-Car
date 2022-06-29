import express from 'express';
import controller from '../controllers/emailController';
import {checkJwt} from '../middlewares/jwt';


const router = express.Router();



router.post('/contact', controller.contact);


export = router;