import express from 'express';
import controller from '../controllers/pokemonController';

const router = express.Router();

router.post('/create', controller.createPokemon);
// router.get('/get/:id', controller.readPokemon);
// router.get('/get/', controller.readAll);
// router.patch('/update/:PokemonId', ValidateJoi(Schemas.Pokemon.update), controller.updatePokemon);
// router.delete('/delete/:PokemonId', controller.deletePokemon);

export = router;