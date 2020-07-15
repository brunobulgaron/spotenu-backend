import { BaseDatabase } from "./BaseDatabase";
import { bandDTO } from '../dto/BandDTO';
import { failureMessages } from "../messages";

export class BandDatabase extends BaseDatabase {
    public async getAllBands(type: string){
        const result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_USER)
            .where({type})
        
        return result;
    };

    public async approveBandDB(id: string){       
        const result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_USER)
            .where({ id })
        
        const data = result[0];

        // if(data === undefined || null){
        //     throw new Error(failureMessages.bandDoesntExists);
        // }

        if(!data){
            throw new Error("Deu ruim");
        }
        
        if(data.is_approved === 1){
            throw new Error(failureMessages.bandAlreadyApproved)
        };

        await this.getConnection()
            .update({ is_approved: 1 })
            .where({ id })
            .into(BandDatabase.TABLE_USER)        
    };
};