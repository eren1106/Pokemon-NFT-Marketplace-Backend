import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { hash, compare } from 'bcrypt';

export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        coins: 100,
        pokemons: [],
    });
    res.status(200).json(user);
});