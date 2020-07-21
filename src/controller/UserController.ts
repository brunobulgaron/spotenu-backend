import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";
import { failureMessages } from "../messages";
import { UserDatabase } from "../data/UserDatabase";

export class UserController {

    async signup(req: Request, res: Response) {
        const { name, nickname, email, password, type } = req.body

        try {
            const token = await new UserBusiness().signup({
                name,
                nickname,
                email,
                password,
                type,
            });

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

    async signupBand(req: Request, res: Response) {
        const { name, nickname, email, password, type, description, is_approved } = req.body

        try {
            const token = await new UserBusiness().signupBand({
                name,
                nickname,
                email,
                password,
                type,
                description,
                is_approved
            });

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        };
    };
    
    async signupAdmin(req: Request, res: Response) {        
        try {
            const { name, nickname, email, password, type, description, is_approved } = req.body

            const auth = req.headers.authorization as string;
            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };
            const tokenTest = await new UserBusiness().signupAdmin({
                name,
                nickname,
                email,
                password,
                type,
                description,
                is_approved,                
            });

            res.status(200).send({ tokenTest });
        } catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

    async login(req: Request, res: Response) {
        const { email, password, type } = req.body;

        try{

            const tokenTeste = await new UserBusiness().login({
                email,
                password,
                type,
            });

            res.status(200).send({ tokenTeste })

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };

    async getUserById(req: Request, res: Response){
        try{
            const auth = req.headers.authorization as string;

            const authenticator = new Authenticator().getData(auth);

            if(authenticator.type !== "admin" && "user_band"){
                return res.status(400).send({message: failureMessages.notAdmin})
            };

            const id = req.params.id;
            
            const usersDB = await new UserDatabase().getUserById(id);
            if(!id){
                throw new Error(failureMessages.userDoesNotExists)
            };

            res.status(200).send({ result: {
                id: usersDB.id,
                name: usersDB.name,
                nickname: usersDB.nickname,
                email: usersDB.email,
                approved: usersDB.is_approved
            } });

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};