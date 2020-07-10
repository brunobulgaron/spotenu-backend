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
                type
            });

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        };
    };

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try{

            const token = await new UserBusiness().login({
                email,
                password
            });

            res.status(200).send({ token })

        }catch(error){
            res.status(400).send({ error: error.message });
        };
    };
};