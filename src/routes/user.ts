import express from 'express';
import controller from '../controllers/userController';
import { checkJwt } from '../middlewares/jwt';


const router = express.Router();

router.get('/', [checkJwt], controller.getAllUsers);
router.post('/', controller.createUser);
router.post('/verifyEmail', controller.verifyEmail);
router.put('/modifyPass/:idUser', [checkJwt], controller.modifyPassword);
router.put('/modifyUser/:idUser', [checkJwt], controller.modifyUser);


export = router;