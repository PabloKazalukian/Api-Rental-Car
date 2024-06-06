import express from 'express';
import controller from '../controllers/AuthController';
import { checkJwt } from '../middlewares/jwt';


const router = express.Router();

router.post('/login', controller.findUserLogin);

export = router;