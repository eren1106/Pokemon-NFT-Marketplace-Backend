import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Pokemon, { IPokemonModel } from '../models/Pokemon';
import User from '../models/User';

export const getAllPokemons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemons: IPokemonModel[] = await Pokemon.find();
    res.status(200).json(pokemons);
});

export const getPokemonById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const pokemon = await Pokemon.findOne({ _id: id });
    res.status(200).json(pokemon);
});

export const createPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const pokemon = await Pokemon.create(req.body);
    res.status(200).json(pokemon);
});

export const buyPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { pokemonId, buyerId, sellerId, price } = req.body;

    const updatedPokemon = await Pokemon.findByIdAndUpdate(pokemonId, {
        forSale: false,
        ownerID: buyerId,
        prevPrice: price,
    }, { new: true });

    const updatedBuyer = await User.findByIdAndUpdate(buyerId, {
        $push: { pokemons: pokemonId },
        $inc: { coins: -price }
    }, { new: true });

    let updatedSeller: string | null = "No Seller";
    if (sellerId) {
        updatedSeller = await User.findByIdAndUpdate(sellerId, {
            $pull: { pokemons: pokemonId },
            $inc: { coins: price }
        }, { new: true });
    }

    res.status(200).json({ updatedPokemon, updatedBuyer, updatedSeller });
});

export const sellPokemon = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { pokemonId, price } = req.body;

    const updatedPokemon = await Pokemon.findByIdAndUpdate(pokemonId, {
        forSale: true,
        price,
    }, { new: true });

    res.status(200).json(updatedPokemon);
});