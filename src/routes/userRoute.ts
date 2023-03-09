import express from 'express';
import { getUserById, togglePokemonFavourite, updateUserById } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.put('/:id/favourite', togglePokemonFavourite);

export = router;