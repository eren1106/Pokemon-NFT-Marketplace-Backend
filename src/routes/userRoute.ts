import express from 'express';
import { getUserById, togglePokemonFavourite } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id/favourite', togglePokemonFavourite);

export = router;