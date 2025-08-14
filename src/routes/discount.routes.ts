import { Router } from "express";
import { discountController } from "../controllers/index.controller";
import { discountMiddleware } from "../application/middlewares/index.middleware";


const router = Router();

router.get('/discount', (req, res) => { discountController.getAllDiscount(req, res); });
router.get('/discount/:id', (req, res) => { discountController.getDiscountById(req, res); });
router.post('/discount', discountMiddleware.discountValidator.bind(discountMiddleware), (req, res) => { discountController.createDiscount(req, res); });

export const DiscountRouter = router;