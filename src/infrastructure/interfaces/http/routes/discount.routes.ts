import { Router } from "express";
import { MiddlewareFactory } from "../../../../application/factories/middleware.factory";
import { discountController } from "../controllers/index.controller";


const router = Router();
const  discountMiddleware= MiddlewareFactory.createDiscountMiddleware();

router.get('/discount', (req, res) => { discountController.getAllDiscount(req, res); });
router.get('/discount/:id', (req, res) => { discountController.getDiscountById(req, res); });
router.post('/discount', discountMiddleware.discountValidator.bind(discountMiddleware), (req, res) => { discountController.createDiscount(req, res); });

export const DiscountRouter = router;