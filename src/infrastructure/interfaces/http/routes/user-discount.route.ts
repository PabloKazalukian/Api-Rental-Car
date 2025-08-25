import { Router } from "express";
import { MiddlewareFactory } from "../../../../application/factories/middleware.factory";
import { userDiscountController } from "../controllers/index.controller";


const router = Router();
const userDiscountMiddleware = MiddlewareFactory.createUserDiscountMiddleware();

router.get('/user-discount', userDiscountMiddleware.passAuth('jwt', { session: false }), (req, res) => { userDiscountController.getAllUserDiscount(req, res) });
router.get('/user-discount/:id', userDiscountMiddleware.passAuth('jwt', { session: false }), (req, res) => { userDiscountController.getUserDiscountById(req, res) });
router.post('/user-discount/', userDiscountMiddleware.discountCreateValidator.bind(userDiscountMiddleware), (req, res) => { userDiscountController.createUserDiscount(req, res) });
router.put('/user-discount/payment', userDiscountMiddleware.discountConfirmValidator.bind(userDiscountMiddleware), (req, res) => { userDiscountController.paymentUserDiscount(req, res) });

export const UserDiscountRouter = router;
