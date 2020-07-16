import { BaseDatabase } from "./BaseDatabase";
import { Song } from "../models/Song";

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
};