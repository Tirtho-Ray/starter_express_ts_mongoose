import mongoose, { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userModelSchema = new Schema<TUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

userModelSchema.pre('save',async function(next) {
    if(this.isModified('password')) 
        return next();
    const salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password,salt)
    next

})
export const User = mongoose.model<TUser>("User",userModelSchema)