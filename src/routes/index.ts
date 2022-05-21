import express from 'express';
import car from './car'
import user from './user'
import auth from './auth';

const router = express.Router();

// router.post('/create/book', controller.createBook);

router.use('/car',car)
router.use('/user',user)
router.use('/auth',auth)


export = router;