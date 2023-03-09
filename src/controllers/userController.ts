import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
});

export const togglePokemonFavourite = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { pokemonId } = req.body;

    const user = await User.findById(id);

    if(!user) {
        res.status(404).json("Pokemon not found!");
        return;
    }

    let updatedUser;

    if(user.favourites.includes(pokemonId)) { // remove pokemon from favourites
        updatedUser = await User.findByIdAndUpdate(id, {
            $pull: { favourites: pokemonId },
        }, { new: true });
    }
    else {
        updatedUser = await User.findByIdAndUpdate(id, { // add pokemon to favourites
            $push: { favourites: pokemonId },
        }, { new: true });
    }

    res.status(200).json(updatedUser);
});

export const updateUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const object = req.body;
    const user = await User.findByIdAndUpdate(id, object);
    res.status(200).json(user);
});