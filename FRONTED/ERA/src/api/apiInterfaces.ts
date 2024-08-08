export interface signupData {
    name?: string,
    email?: string,
    password?: string,
    bio?: string,
    profilePic?: string
}

export interface loginData {
    email?: string,
    password?: string
}

export interface forgotPasswordsDataInterface {
    email: string,
    password: string
}

export interface profilePicFormData {
    lastModified?: number,
    name?: string,
    size?: number,
    type?: string,
    webkitRelativePath?: string
}