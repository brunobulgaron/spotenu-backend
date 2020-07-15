import { genreInputDTO } from "../dto/GenreDTO";
import { failureMessages } from "../messages";
import { IdGenerator } from "../services/IdGenerator";
import { Genre } from "../models/Genre";
import { GenreDatabase } from "../data/GenreDatabase";

export class GenreBusiness {
    public async createGenre({ name }: genreInputDTO) {
        
        const genreValidation = await new GenreDatabase().getGenreByName(name);
        if(genreValidation){
            throw new Error(failureMessages.genreAlreadyExists);
        };
        
        if(name.length < 3){
            throw new Error(failureMessages.invalidGenre);
        };

        const id = new IdGenerator().generate();

        const genreData: Genre = {
            id,
            name
        };

        const genreInfo = await new GenreDatabase().createGenre(genreData);

        return { genreInfo };
    };
};