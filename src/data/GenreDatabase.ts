import { BaseDatabase } from "./BaseDatabase";
import { genreInputDTO } from "../dto/GenreDTO";

export class GenreDatabase extends BaseDatabase {
    public async createGenre(body: genreInputDTO){
        try{
            await super.getConnection()
                .insert(body)
                .into(BaseDatabase.TABLE_GENRE);

            super.destroyConnection();            
        }catch(error){
            throw new Error(error.message);
        }; 
    };

    public async getGenreByName(name: string){
        try{
            const result = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_GENRE)
                .where({ name })
        
            return result[0];
            
        }catch(error){
            throw new Error(error.message);
        }
    }

    public async getAllGenres(){
        try{
            const result = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_GENRE)
            
            return result;
        
        }catch(error){
            throw new Error(error.message);
        };
    };
};