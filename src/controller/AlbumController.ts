import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { AlbumDatabase } from "../data/AlbumDatabase";

export class AlbumController {
    async createAlbum(req: Request, res: Response){
        try{
            const { name, id_genre } = req.body;
            
            const auth = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(auth);

            // if(authenticator.type !== "band"){
            //     return res.status(400).send({message: failureMessages.notBand})
            // };

            await new AlbumBusiness().createAlbum({ name, id_genre, created_by: authenticator.id });

            res.status(200).send({ message: successMessages.albumSuccessfullyCreated });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async getAllAlbums(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin" || "band"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const albumsDB = await new AlbumDatabase().getAllAlbums();

            res.status(200).send({ result: albumsDB });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async getAlbumsByCreatedBy(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "band"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const albumsDB = await new AlbumDatabase().getAlbumsByCreatedBy(authenticator.id);

            res.status(200).send({ result: albumsDB });
        }catch(error){
            res.status(400).send({ error: error.message })
        };
    };
};