import { signUpInputDTO, loginInputDTO, signUpBandInputDTO } from "../dto/UserDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { User, UserBand } from "../models/User";
import { failureMessages, successMessages } from "../messages";

export class UserBusiness{
    public async signup({
        name, nickname, email, password, type
    }: signUpInputDTO) {

        // E-mail validations
        const emailExists = await new UserDatabase().getUserByEmail(email)

        if(emailExists) throw new Error(failureMessages.emailExists);
        if(email.length < 6) throw new Error(failureMessages.invalidEmail);
        if(!email.includes("@")) throw new Error(failureMessages.invalidEmail);

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

    public async signupBand({
        name, nickname, email, password, type, description, is_approved
    }: signUpBandInputDTO) {

        // E-mail validations
        const emailExists = await new UserDatabase().getUserByEmail(email)

        if(emailExists) throw new Error(failureMessages.emailExists);
        if(email.length < 6) throw new Error(failureMessages.invalidEmail);
        if(!email.includes("@")) throw new Error(failureMessages.invalidEmail);

        // Password validation
        if(password.length < 6 || !password){
            throw new Error(failureMessages.password)
        };
        
        const hashedPassword = await new HashManager().hash(password);
        const id = new IdGenerator().generate();

        const userData: UserBand = {
            id,
            name,
            nickname,
            email,
            password: hashedPassword,
            type: "band",
            description,
            is_approved: false
        }

        await new UserDatabase().createUser(userData);
    
        const token = new Authenticator().generateToken({ id });

        // return { token };
        return { message: successMessages.successfulBandSignUp }
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