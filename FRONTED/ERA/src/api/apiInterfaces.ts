export interface signupData {
    name?: string,
    email?: string,
    password?: string,
    bio?: string,
    profilPic?: string
}

export interface loginData {
    email?: string,
    password?: string
}

export interface forgotPasswordsDataInterface {
    email: string,
    password: string
}