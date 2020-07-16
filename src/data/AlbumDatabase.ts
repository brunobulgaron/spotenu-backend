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
};