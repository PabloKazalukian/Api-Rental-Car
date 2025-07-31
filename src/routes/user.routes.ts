import { Router } from "express";
import { userController } from "../controllers/index.controller"
import { UserMiddleware } from "../middlewares/user.middleware";
import { Routes } from "./routes";


const middleware = new UserMiddleware();
const router = Router();

router.get('/user', (req, res) => { userController.getAllUser(req, res) });
router.get('/user/:idUser', (req, res) => { userController.getUserById(req, res) });
router.put('/user/modifyPass/:idUser', (req, res) => { userController.modifyPassword(req, res); });
router.put('/user/:idUser', (req, res, next) => [middleware.userValidator(req, res, next)], (req, res) => { userController.modifyUser(req, res); });
router.post('/user', (req, res, next) => [middleware.userValidator(req, res, next)], (req, res) => { userController.createUser(req, res); });
router.post('/user/verifyEmail', (req, res) => { userController.verifyEmail(req, res); });
router.post('/user/verifyUsername', (req, res) => { userController.verifyUsername(req, res); });
router.delete('/user/:idUser', middleware.passAuth("jwt"), (req, res, next) => [middleware.checkAdminRole(req, res, next)], (req, res) => { userController.deleteUser(req, res); });

export const UserRouter = router;