"use server";
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import bcrypt from "bcrypt";

const loginUser = async(payload) => {
    const {email, password} = payload;

    const usersCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await usersCollection.findOne({email});
    if(!user) return null;
    const isPasswordOk = bcrypt.compare(user.password, password);
    if(!isPasswordOk) return null;

    return user;
    
};

export default loginUser;