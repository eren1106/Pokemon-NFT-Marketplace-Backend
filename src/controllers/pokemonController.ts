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

export const getPokemonsByUserId = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if(user) {
        const pokemons = await Pokemon.find({ _id: { $in: user.pokemons } });
        res.status(200).json(pokemons);
    }
    res.status(404).json("User not found!");
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

    const pokemon = await Pokemon.findById(pokemonId);

    if(!pokemon) {
        res.status(404).json("Pokemon not found!");
        return;
    }

    let updatedPokemon;

    if(pokemon.forSale) { // cancel sell
        updatedPokemon = await Pokemon.findByIdAndUpdate(pokemonId, {
            forSale: false,
            price: pokemon.prevPrice,
        }, { new: true });
    }
    else { // sell
        updatedPokemon = await Pokemon.findByIdAndUpdate(pokemonId, {
            forSale: true,
            price,
        }, { new: true });
    }
    

    res.status(200).json(updatedPokemon);
});