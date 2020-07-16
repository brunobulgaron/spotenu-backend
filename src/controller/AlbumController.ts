import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { AlbumBusiness } from "../business/AlbumBusiness";

export class AlbumController {
    async createAlbum(req: Request, res: Response){
        try{
            const { name, albumGenres } = req.body;
            
            const auth = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "band"){
                return res.status(400).send({message: failureMessages.notBand})
            };

            await new AlbumBusiness().createAlbum({ name, albumGenres, created_by: authenticator.id });

            res.status(200).send({ message: successMessages.albumSuccessfullyCreated });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};