import { albumDTO } from "../dto/AlbumDTO";
import { failureMessages } from "../messages";
import { IdGenerator } from "../services/IdGenerator";
import { Album } from "../models/Album";
import { AlbumDatabase } from "../data/AlbumDatabase";

export class AlbumBusiness {
    public async createAlbum({ name, created_by, id_genre }: albumDTO) {

        if(!name){
            throw new Error(failureMessages.invalidAlbum);
        };

        const id = new IdGenerator().generate();

        const albumData: Album = {
            id,
            name,
            created_by,
            id_genre
        };        

        const albumInfo = new AlbumDatabase().createAlbum(albumData)

        return { albumInfo };
        
    };
};