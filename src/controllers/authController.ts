import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User';
import { hash, compare } from 'bcrypt';

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    // TODO: Check if email duplicated

    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        coins: 100,
        pokemons: [],
    }
    const user = await User.create(newUser);
    res.status(200).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (user) {
        const isPasswordMatch = await compare(password, user.password);
        if (isPasswordMatch) {
            res.status(200).json(user);
            return;
        }
    }
    res.status(401).json({ error: 'Authentication failed' });
});