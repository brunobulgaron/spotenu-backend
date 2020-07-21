import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../models/Album";

export class AlbumDatabase extends BaseDatabase {
    public async createAlbum(body: Album){
        try{
            await super.getConnection()
                .insert({
                    id: body.id,
                    name: body.name,
                    created_by: body.created_by
                })
                .into(BaseDatabase.TABLE_ALBUM)

            await super.getConnection()
                .insert({
                    id_album: body.id,
                    id_genre: body.id_genre
                })
                .into(BaseDatabase.TABLE_ALBUMS_GENRES)

        }catch(error){
            throw new Error(error.message);
        };
    };

    public async getAlbumById(id: string): Promise<Album>{
        try{
            const result = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_ALBUM)
                .where({ id })

            return result[0];
            
        }catch(error){
            throw new Error(error.message);
        };
    };

    public async getAllAlbums() {
        try{
            const result = await super.getConnection()
                .select("*")
                .from(BaseDatabase.TABLE_ALBUM)
            
            return result;
        
        }catch(error){
            throw new Error(error.message);
        };
    };
};