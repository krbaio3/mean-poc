import express from 'express';
import {
    pruebaUser,
    registerUser
} from '../controllers';

const router = express.Router();

router.get('/user', pruebaUser);
router.post('/user', registerUser);

module.exports = router;
