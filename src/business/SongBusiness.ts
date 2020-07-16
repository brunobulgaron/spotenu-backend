import { songDTO } from "../dto/SongDTO";
import { failureMessages } from "../messages";
import { IdGenerator } from "../services/IdGenerator";
import { Song } from "../models/Song";
import { SongDatabase } from "../data/SongDatabase";
import { AlbumDatabase } from "../data/AlbumDatabase";

export class SongBusiness {
    public async createSong({ name, id_album }: songDTO){
        
        if(!name || !id_album){
            throw new Error(failureMessages.invalidSong);
        };

        const albumValidation = await new AlbumDatabase().getAlbumById(id_album)
        if(!albumValidation){
            throw new Error(failureMessages.albumDoesntExists);
        };

        const songValidation = await new SongDatabase().getSongByName(name);
        if(songValidation){
            throw new Error(failureMessages.songAlreadyExists);
        };

        const id = new IdGenerator().generate();

        const songData: Song = {
            id,
            name,
            id_album
        };

        const songInfo = new SongDatabase().createSong(songData);

        return { songInfo };
    };
};