import { BaseDatabase } from "./BaseDatabase";
import { signUpInputDTO } from "../dto/UserDTO";
import { User } from "../models/User";

export class UserDatabase extends BaseDatabase {
    tableName: string = "Spotenu_Users";

    public async createUser(body: signUpInputDTO){        
        try{
            await super.getConnection()
                .insert(body)
                .into(BaseDatabase.TABLE_USER);

            super.destroyConnection();            
        }catch(error){
            throw new Error(error.message);
        };        
    };

    public async getUserByEmail(email: string): Promise<User>{
        const result = await this.getConnection()
            .select("*")
            .where({ email })
            .from(UserDatabase.TABLE_USER);
        
        return result[0];
    };
    
    
    
    
    // public async signup(id: string, name: string, nickname: string, email: string, password: string, type: string = "user_free") {
    //     try {
    //         await super.getConnection().raw(`
    //          INSERT INTO Spotenu_Users(id, name, nickname, email, password, type)
    //          VALUES
    //              (
    //             "${id}",
    //             "${name}",
    //             "${nickname},
    //             "${email}",
    //             "${password}",
    //             "${type}"
    //             )
    //             `);
    //         } catch (err) {
    //             throw new Error(err.message);
    //         }
    // }








    // public async approve(id: string){
    //     const queryData = await this.getConnection().raw(`
    //     SELECT * FROM Spotenu_Users
    //     WHERE id = "${id}"
    //     `);
    
    //     const data = queryData[0][0];
    //     console.log(data);
    
    //     if(data.is_approved === 1){
    //       throw new Error("Usuário já aprovado!");
    //     }
    
    //     await this.getConnection().raw(`
    //     UPDATE Spotenu_Users
    //     SET is_approved = 1
    //     WHERE id = "${id}"
    //     `);
    // }

    // public async getUserById(id: string){

    //     const result = await this.getConnection().raw(`
    //     SELECT * FROM Spotenu_Users
    //     WHERE id = "${id}"
    //     `);
    
    //     const data = result[0][0];
    //     if(data){

    //         console.log(data);
    //         if(data.is_approved === 0){
    //             throw new Error("Usuário não aprovado");
    //         }
    //         const user = new User(data.id, data.name, data.email, User.convertStringToUsertype(data.type));
    //         const userRecipes = await new RecipeDatabase().getRecipesByUserId(user.getId());
    //         user.setRecipes(userRecipes);
    //         return user;
    //     }else{
    //         throw new Error("Usuário não encontrado");
    //     }
    // }
}