import z from "zod";

const userValidationSchema = z.object({
    name:z.string().max(10,"Name can not be extend 10 chr"),
    email:z.string().email("enter valid email"),
    password:z.string().min(6,"password need minimum 6 chr").max(10,"Name can not be extend 10 chr"),
    
});

export const UserValidation ={
    userValidationSchema
}