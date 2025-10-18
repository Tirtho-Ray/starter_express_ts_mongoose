import config from "../../config";
import AppError from "../../error/appError";
import { createToken } from "../../utils/token";
import { USER_ROLE, USER_STATUS } from "../user/user.constant"
import { User } from "../user/user.model"
import { TLogin, TRegister } from "./auth.interface"
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import httpStatus  from 'http-status';
import { comparePassword } from "../../utils/bcryptHelper";



const login = async (payload:TLogin) =>{

const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');

  if (user.status === USER_STATUS.BLOCKED) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
  }

  const isMatchPass = await comparePassword(payload.password, user.password);
  if(!isMatchPass) throw new AppError(httpStatus.FORBIDDEN,"In correct password")

    const data ={
        id:user._id,
        name:user.name,
        email:user.email,
    }

    const token  = jwt.sign(
        data,
        config.jwt_secret as string,
        {
            expiresIn:"1d"
        }
    )
    return {
        user,
        token
    };


}

const registerUser = async(data:TRegister) =>{

    const isExistingUser = User.find({email:data.email});
    if(!isExistingUser) throw new AppError(httpStatus.CONTINUE,"User Already exits");
    const user =await User.create({
        ...data,
        role: USER_ROLE.USER,
        status: USER_STATUS.ACTIVE,
    });

    const jwtPayload={
        _id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        status:user.status
    };

    const token = createToken(
        jwtPayload,
        config.jwt_secret as string,
        config.jwt_token_exp as any
    )
    return {
        user,
        token
    }
}
export const AuthServices ={
    login
}