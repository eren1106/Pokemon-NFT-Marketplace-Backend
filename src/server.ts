import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import pokemonRoutes from './routes/pokemonRoute';

dotenv.config();

const port = process.env.PORT;

connectDB();

const app: Express = express();

app.use(express.json()); // used to parse incoming JSON data and add it to the request.body object.
app.use(express.urlencoded({ extended: false })); // used to parse incoming urlencoded data and add it to the request.body object.

app.use('/api/pokemons', pokemonRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('testing123');
});

app.listen(port, () => {
  console.log(`TATAKAEEE at http://localhost:${port}`);
});