import { albumDTO } from "../dto/AlbumDTO";
import { failureMessages } from "../messages";
import { IdGenerator } from "../services/IdGenerator";
import { Album } from "../models/Album";
import { AlbumDatabase } from "../data/AlbumDatabase";

export class AlbumBusiness {
    public async createAlbum({ name, albumGenres, created_by }: albumDTO) {

        if(!name || !albumGenres){
            throw new Error(failureMessages.invalidAlbum);
        };

        const id = new IdGenerator().generate();

        const albumData: Album = {
            id,
            name,
            created_by
        };

        const albumInfo = new AlbumDatabase().createAlbum(albumData)

        return { albumInfo };
        
    };
};