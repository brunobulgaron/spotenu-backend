import express from "express";
import { BandController } from '../controller/BandController';

export const bandRouter = express.Router();

// Get all bands
bandRouter.get("/allBands", new BandController().getAllBands);

// Approve band
bandRouter.post("/approve/:id", new BandController().approveBand);