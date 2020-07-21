import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { SongBusiness } from "../business/SongBusiness";
import { SongDatabase } from "../data/SongDatabase";

export class SongController {
    async createSong(req: Request, res: Response){
        try {
            const { name, id_album } = req.body;            

            const auth = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "band"){
                return res.status(400).send({message: failureMessages.notBand})
            };            

            await new SongBusiness().createSong({ name, id_album });

            res.status(200).send({ message: successMessages.songSuccessfullyCreated });

            
        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async getAllSongs(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin" && "user_band"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const songsDB = await new SongDatabase().getAllSongs();

            res.status(200).send({ result: songsDB });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};