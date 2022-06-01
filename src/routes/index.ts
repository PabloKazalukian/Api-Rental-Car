import express from 'express';
import car from './car'
import user from './user'
import auth from './auth';
import request from './request'

const router = express.Router();

// router.post('/create/book', controller.createBook);

router.use('/car',car)
router.use('/user',user)
router.use('/auth',auth)
router.use('/request',request)



export = router;