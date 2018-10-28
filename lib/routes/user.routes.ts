import { Router } from 'express';
import { pruebaUser, registerUser } from '../controllers';

const router = Router();

router.get('/user', pruebaUser);
router.post('/user', registerUser);

module.exports = router;
