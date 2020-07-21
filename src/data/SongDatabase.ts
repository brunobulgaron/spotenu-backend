import { BaseDatabase } from "./BaseDatabase";
import { Song } from "../models/Song";
import { BandDatabase } from "./BandDatabase";

export class SongDatabase extends BaseDatabase {
    public async createSong(body: Song){
        try {
            await super.getConnection()
                .insert(body)
                .into(BaseDatabase.TABLE_SONGS);
                
        }catch(error){
            throw new Error(error.message);
        };
    };

    public async getSongByName(name: string){
        try {
            const result = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_SONGS)
                .where({ name })
            
            return result[0];
        
        }catch(error){
            throw new Error(error.message);
        };
    };

    public async getAllSongs() {
        try{
            const result = await super.getConnection()
                .select("*")
                .from(BandDatabase.TABLE_SONGS)
            
            return result;
            
        }catch(error){
            throw new Error(error.message);
        };
    };
};