export type UserType = { 
    username: string
    email: string
    authentication: {
        salt: string
        password: string 
    }
}