import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Pokemon, { IPokemonModel } from '../models/Pokemon';

// const getPokemons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
//     const Pokemons: IPokemonModel[] = await Pokemon.find({ owner: req.user?.id });
//     res.status(200).json(Pokemons);
// });

const createPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {
        name,
        no,
        index,
        types,
        level,
        atk,
        def,
        hp,
        imgUrl,
        price,
        prevPrice,
        ownerID
    } = req.body;

    const pokemon = new Pokemon({
        _id: new mongoose.Types.ObjectId(),
        name,
        no,
        index,
        types,
        level,
        atk,
        def,
        hp,
        imgUrl,
        price,
        prevPrice,
        ownerID
    });

    await pokemon.save();

    res.status(200).json(pokemon);
});

export default { createPokemon };