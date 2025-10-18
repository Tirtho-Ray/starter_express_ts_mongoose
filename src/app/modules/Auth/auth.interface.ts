import { USER_ROLE } from "../user/user.constant"

export type TLogin ={
    email:string,
    password:string
}
export type TRegister ={
    name:string,
    email:string,
    password:string
    role: keyof typeof USER_ROLE
}