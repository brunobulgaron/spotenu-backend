import { Request, Response } from "express";
import { GenreBusiness } from '../business/GenreBusiness';
import { Authenticator } from "../services/Authenticator";
import { failureMessages, successMessages } from "../messages";
import { GenreDatabase } from "../data/GenreDatabase";

export class GenreController {
    async createGenre(req: Request, res: Response){       
        try{
            const { name } = req.body;

            const auth = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };
            
            await new GenreBusiness().createGenre({ name });

            res.status(200).send({ message: successMessages.genreSuccessfullyCreated });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async getAllGenres(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            // if(authenticator.type !== "admin" && "band"){
            //     return res.status(400).send({message: failureMessages.notAdmin})
            // };

            const genresDB = await new GenreDatabase().getAllGenres();            

            res.status(200).send({ result: genresDB });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};