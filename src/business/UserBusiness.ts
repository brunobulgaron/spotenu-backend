import { signUpInputDTO, loginInputDTO } from "../dto/UserDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { User } from "../models/User";
import { failureMessages } from "../messages";

export class UserBusiness{
    public async signup({
        name, nickname, email, password, type
    }: signUpInputDTO) {

        // E-mail validation
        const emailValidation = await new UserDatabase().getUserByEmail(email)

        if(emailValidation){
            throw new Error(failureMessages.emailExists)
        };

        // Password validation
        if(password.length < 6 || !password){
            throw new Error(failureMessages.password)
        };
        
        const hashedPassword = await new HashManager().hash(password);
        const id = new IdGenerator().generate();

        const userData: User = {
            id,
            name,
            nickname,
            email,
            password: hashedPassword,
            type
        }

        await new UserDatabase().createUser(userData);
    
        const token = new Authenticator().generateToken({ id });

        return { token };        
    };

    public async login({ email, password}: loginInputDTO) {
        // E-mail validation
        const emailValidation = await new UserDatabase().getUserByEmail(email)

        if(!emailValidation){
            throw new Error(failureMessages.emailDoesntExists)
        };

        const passwordValidation = await new HashManager().compare(
            password,
            emailValidation.password
        )

        if(!passwordValidation){
            throw new Error(failureMessages.wrongPassword)
        };

        const token = new Authenticator().generateToken({ id: emailValidation.id })

        return { token };
    };
};