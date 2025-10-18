import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';


interface MyJwtPayload  extends JwtPayload {
    _id:string,
    name:string,
    email:string,
    role:string,
    status:string
}
export const createToken = (JwtPayload:MyJwtPayload,secret:string,expiresIn:string) =>{
    const options:SignOptions = {expiresIn:expiresIn as any};
    return {JwtPayload,secret,options}
};

