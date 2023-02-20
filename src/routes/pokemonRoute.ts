import express from 'express';
import controller from '../controllers/pokemonController';

const router = express.Router();

router.get('/', controller.getAllPokemons);
router.get('/:id', controller.getPokemonById);
router.post('/create', controller.createPokemon);

export = router;