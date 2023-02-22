import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Pokemon, { IPokemonModel } from '../models/Pokemon';

export const getAllPokemons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemons: IPokemonModel[] = await Pokemon.find();
    res.status(200).json(pokemons);
});

export const getPokemonById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({_id: id});
    res.status(200).json(pokemon);
});

export const createPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemon = await Pokemon.create(req.body);
    res.status(200).json(pokemon);
});