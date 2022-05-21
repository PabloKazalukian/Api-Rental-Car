import express from 'express';
import controller from '../controllers/AuthController';


const router = express.Router();



router.get('/login', controller.findUserByEmail);


export = router;