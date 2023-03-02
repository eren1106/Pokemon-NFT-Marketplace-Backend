import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
});