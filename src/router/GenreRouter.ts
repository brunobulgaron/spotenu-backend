import express from "express";
import { GenreController } from '../controller/GenreController';

export const genreRouter = express.Router();

// Create Genre
genreRouter.post("/createGenre", new GenreController().createGenre);

// Get All Genres
genreRouter.get("/allGenres", new GenreController().getAllGenres);