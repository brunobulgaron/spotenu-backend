// export class User {
//     constructor(
//     private id: string,
//     private name: string,
//     private nickname: string,
//     private email: string,
//     private type: UserType,
//     ){}

// }

export enum UserType{
    USER_FREE = "user_free",
    USER_PREMIUM = "user_premium",
    BAND = "band",
    ADMIN = "admin"
}

export interface User {
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    type: string
}