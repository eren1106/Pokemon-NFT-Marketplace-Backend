import express from 'express';
import { buyPokemon, createPokemon, getAllPokemons, getPokemonById, getPokemonsByFavourites, getPokemonsByUserId, sellPokemon } from '../controllers/pokemonController';

const router = express.Router();

router.get('/', getAllPokemons);
router.get('/:id', getPokemonById);
router.get('/user/:userId', getPokemonsByUserId);
router.get('/user/:userId/favourites', getPokemonsByFavourites);
router.post('/create', createPokemon);
router.post('/buy', buyPokemon);
router.put('/sell', sellPokemon);

export = router;