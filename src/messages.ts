export enum failureMessages {
    password = "A senha deve conter 6 caracteres ou mais.",
    passwordAdmin = "A senha deve conter 10 caracteres ou mais.",
    wrongPassword = "E-mail ou Senha incorreto.",    
    emailExists = "E-mail já cadastrado.",
    emailDoesntExists = "E-mail ou Senha incorreto.",
    invalidEmail = "E-mail inválido",
    notAdmin = "Permissão inválida!",
    bandAlreadyApproved = "Essa Banda já foi aprovada!",
    bandDoesntExists = "Banda inexistente!",
    bandNotApproved = "Aguarde sua banda ser aprovada."
};

export enum successMessages {
    successfulBandSignUp = "Banda cadastrada com sucesso! Aguarde a sua aprovação por um Administrador.",
    bandSuccessfullyApproved = "Banda aprovada com sucesso!"
}