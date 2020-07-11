export interface signUpInputDTO {
        // id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        type: string,
};

export interface signUpBandInputDTO {
        // id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        type: string,
        description: string,
        is_approved: boolean
};

export interface signUpAdminInputDTO {
        // id: string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        type: string,
        description: string,
        is_approved: boolean,
        token: string
};

export interface loginInputDTO {
        email: string,
        password: string,
        type: string
};