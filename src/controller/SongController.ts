import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { SongBusiness } from "../business/SongBusiness";

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
};