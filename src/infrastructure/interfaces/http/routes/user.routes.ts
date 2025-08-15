import { Router } from "express";
import { userController } from "../controllers/index.controller"
import { userMiddleware } from "../../../../application/middlewares/index.middleware";


const router = Router();

router.get('/user', (req, res) => { userController.getAllUser(req, res) });
router.get('/user/:idUser', (req, res) => { userController.getUserById(req, res) });
router.put('/user/modifyPass/:idUser', (req, res) => { userController.modifyPassword(req, res); });
router.put('/user/:idUser', userMiddleware.userValidator.bind(userMiddleware), (req, res) => { userController.modifyUser(req, res); });
router.post('/user', userMiddleware.userValidator.bind(userMiddleware), (req, res) => { userController.createUser(req, res); });
router.post('/user/verifyEmail', (req, res) => { userController.verifyEmail(req, res); });
router.post('/user/verifyUsername', (req, res) => { userController.verifyUsername(req, res); });
router.delete('/user/:idUser', userMiddleware.passAuth("jwt"), userMiddleware.checkAdminRole.bind(userMiddleware), (req, res) => { userController.deleteUser(req, res); });

export const UserRouter = router;