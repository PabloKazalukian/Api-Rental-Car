import { DiscountMiddleware } from "../middlewares/discount.middleware";
import { Router } from "express";
import { discountController } from "../controllers/index.controller";


const router = Router();
const middleware = new DiscountMiddleware;

router.get('/discount', (req, res) => { discountController.getAllDiscount(req, res); });
router.get('/discount/:id', (req, res) => { discountController.getDiscountById(req, res); });
router.post('/discount', (req, res, next) => [middleware.discountValidator(req, res, next)], (req, res) => { discountController.createDiscount(req, res); });

export const DiscountRouter = router;