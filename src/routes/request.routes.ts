// import { CarController } from "../controllers/car.controller";
import { Router } from "express";
import { requestController } from "../controllers/index.controller";
import { requestMiddleware } from "../application/middlewares/index.middleware";


const router = Router();

router.get('/request', (req, res) => { requestController.getAllRequest(req, res) });
router.get('/request/:id', (req, res) => { requestController.getRequestById(req, res); });
router.get('/request/allOfUserId/:user_id', (req, res) => { requestController.getRequestByUser(req, res); });
router.get('/request/allOfCarId/:car_id', (req, res) => { requestController.getRequestBycar(req, res); });
router.put('/request/cancel', (req, res) => { requestController.cancelRequest(req, res); });
router.put('/request/confirm', (req, res) => { requestController.confirmRequest(req, res); });
router.post('/request', requestMiddleware.requestValidator.bind(requestMiddleware), (req, res) => { requestController.createRequest(req, res); });

export const RequestRouter = router;