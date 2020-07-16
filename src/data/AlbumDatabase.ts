import { BaseDatabase } from "./BaseDatabase";
import { albumDTO } from "../dto/AlbumDTO";
import { Album } from "../models/Album";

export class AlbumDatabase extends BaseDatabase {
    public async createAlbum(body: Album){
        try{
            await super.getConnection()
                .insert(body)
                .into(BaseDatabase.TABLE_ALBUM)

        }catch(error){
            throw new Error(error.message);
        };
    };    
};