import express from "express";
import { BandController } from '../controller/BandController';

export const bandRouter = express.Router();

// Get all bands
bandRouter.get("/allBands", new BandController().getAllBands);

// Get all unapproved bands
bandRouter.get("/getAllUnapprovedBands", new BandController().getAllUnapprovedBands);

// Approve band
bandRouter.post("/approve/:id", new BandController().approveBand);