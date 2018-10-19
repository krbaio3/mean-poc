import express from 'express';
import {
    prueba
} from '../controllers';

const router = express.Router();

router.get('/vehicles', prueba);

module.exports = router;