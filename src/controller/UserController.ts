import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

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
        const { name, nickname, email, password, type, description, is_approved } = req.body

        const auth = req.headers.authorization as string;

        try {
            const tokenTest = await new UserBusiness().signupAdmin({
                name,
                nickname,
                email,
                password,
                type,
                description,
                is_approved,
                token: auth
            });

            res.status(200).send({ tokenTest });
        } catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

    async login(req: Request, res: Response) {
        const { email, password, type } = req.body;

        try{

            const token = await new UserBusiness().login({
                email,
                password,
                type
            });

            res.status(200).send({ token })

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};