import express, {Application, Request, Response, NextFunction} from "express";
import User from '../models/users';
import * as userMapper from '../DTO/userDto'

export const Users = (req: Request, res: Response, next: NextFunction) => {
    console.log("default route======>");

    return res.status(200).json("Hello CEI ");
}
export const getAll = async (): Promise<userMapper.UserDTO[]> => {
    try{
    const user = await User.findAll();
    console.log("all data======>", user);
    return user.map(userMapper.toUser)
    } catch (error) {
        console.log(error);
        throw new Error('Fail To Read Users');
    }
};

export const getOne = async (id: number): Promise<userMapper.UserDTO> => {
    console.log('I AM IN GET ONE USER');

    const user = await User.findByPk(id);
    console.log('user displayed');
    if (!user) {
        // throw custom error
        throw new Error('User was not found')
    }
    return userMapper.toUser(user);
};

export const createOne = async (payload: userMapper.CreateUserDTO): Promise<userMapper.UserDTO> => {
    try {
        const USER_MODEL = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
        };
        const user = await User.create(USER_MODEL);
        console.log('User created ======>', user);
        return userMapper.toUser(user)
    } catch (error) {
        console.log(error);
        throw new Error(`Fail to create User`)

    }
};

export const updateOne = async (id: number, payload: userMapper.UpdateUserDTO): Promise<userMapper.UserDTO> => {
   try {
       const [updated] = await User.update(payload, {
           where: {id: id}
       });
       console.log('The Intermediate Updated User======>',updated)
       if (updated) {
           const updatedUser = await User.findByPk(id) //{where: {id: id}});
           if (!updatedUser) {
                   throw new Error('User was not found')
               }
            return userMapper.toUser(updatedUser);
       }else{
           throw new Error('User not found');
       }
   }catch (e){
       throw e
   }

    // const user = await User.findByPk(id);
    // if (!user) {
    //     //throw custom error
    //     throw new Error('User was not found')
    // }
    // const USER_MODEL = {
    //     username: payload.username,
    //     email: payload.email,
    //     password: payload.password,
    // };
    // const uuser = await user.update(USER_MODEL) //, { where: { id: id } });
    // console.log("update user ======>", uuser)
    // return userMapper.toUser(uuser);
};

export const deleteOne = async (id: number): Promise<number> => {
    const users = await User.findByPk(id);
    if (!users) {
        //throw custom error
        throw new Error('User was not found')
    }
    const user = await User.destroy({where: {id: id}});
    console.log('user deleted (1)------->', user);
    return user
};
