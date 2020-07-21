import express from 'express';
import { SongController } from '../controller/SongController';

export const songRouter = express.Router();

songRouter.post("/createSong", new SongController().createSong);

songRouter.get("/getAllSongs", new SongController().getAllSongs);