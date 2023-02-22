import express from 'express';
import { createPokemon, getAllPokemons, getPokemonById } from '../controllers/pokemonController';

const router = express.Router();

router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);
router.post('/create', createPokemon);

export = router;