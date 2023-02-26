import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import pokemonRoutes from './routes/pokemonRoute';
import authRoutes from './routes/authRoute';
import userRoutes from './routes/userRoute';

import cors from 'cors';

dotenv.config();

const port = process.env.PORT;

connectDB();

const app: Express = express();
 
app.use(cors());

app.use(express.json()); // used to parse incoming JSON data and add it to the request.body object.
app.use(express.urlencoded({ extended: false })); // used to parse incoming urlencoded data and add it to the request.body object.

// ROUTES
app.use('/api/pokemons', pokemonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('testing123');
});

app.listen(port, () => {
  console.log(`TATAKAEEE at http://localhost:${port}`);
});