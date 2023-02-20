import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Pokemon, { IPokemonModel } from '../models/Pokemon';

const getAllPokemons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemons: IPokemonModel[] = await Pokemon.find();
    res.status(200).json(pokemons);
});

const getPokemonById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({_id: id});
    res.status(200).json(pokemon);
});

const createPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemon = await Pokemon.create(req.body);
    res.status(200).json(pokemon);
});

export default { getAllPokemons, getPokemonById, createPokemon };