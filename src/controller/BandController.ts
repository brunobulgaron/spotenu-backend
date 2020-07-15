import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { BandDatabase } from "../data/BandDatabase";
import  { bandDTO } from '../dto/BandDTO';

export class BandController {

    async getAllBands(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const bandsDB = await new BandDatabase().getAllBands("band");
            const allBands = bandsDB.map((band) => {
                return {                    
                    id: band.id,
                    name: band.name,
                    nickname: band.nickname,
                    email: band.email,
                    is_approved: band.is_approved
                }
            });

            res.status(200).send({ allBands });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async approveBand(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const id = req.params.id;

            await new BandDatabase().approveBandDB(id);
            if(!id){
                throw new Error(failureMessages.bandDoesntExists)
            };

            res.status(200).send({message: successMessages.bandSuccessfullyApproved});
        
        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};