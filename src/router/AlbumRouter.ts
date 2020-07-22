import express from "express";
import { AlbumController } from '../controller/AlbumController';

export const albumRouter = express.Router();

albumRouter.post("/createAlbum", new AlbumController().createAlbum);

albumRouter.get("/getAllAlbums", new AlbumController().getAllAlbums);

albumRouter.get("/getAlbumsByCreatedBy", new AlbumController().getAlbumsByCreatedBy);