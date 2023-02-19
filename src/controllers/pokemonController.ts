import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Pokemon, { IPokemonModel } from '../models/Pokemon';

// const getPokemons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
//     const Pokemons: IPokemonModel[] = await Pokemon.find({ owner: req.user?.id });
//     res.status(200).json(Pokemons);
// });

const createPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemon = await Pokemon.create(req.body);
    res.status(200).json(pokemon);
});

export default { createPokemon };