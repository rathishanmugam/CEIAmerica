import * as userController from '../controllers/users'
import { Router } from 'express'
const userRouter = Router()
import express, { Application, Request, Response, NextFunction } from "express";
import * as userMapper from "../DTO/userDto";
import { validateRequestSchema } from '../middlewares/validate-request';
import { userSchema } from '../schema/user-schema';

userRouter.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userController.getAll()
        return res.status(200).json({ result, status: 200, msg: "Successfully Got All Users" });
    } catch (error) {
        return res.status(500).json({ msg: 'Fail To Get  Records', status: 500, route: "/users" });
    }
})

userRouter.get('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
   try {
       const id = Number(req.params.id)
       const result = await userController.getOne(id)
       return res.status(200).json({ result, status: 200, msg: "Successfully Got user" });
   } catch (error) {
       return res.status(404).json({ msg: 'User was not found', status: 404, route: `/users/${req.params.id}` });
   }
})

userRouter.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const result = await userController.deleteOne(id)
        if(result)
        return res.status(200).json({ count:result, status: 200, msg: "Successfully deleted User" });
    } catch (error) {
        return res.status(404).json({ msg: 'Fail To Delete User,Check For User Exists', status: 404, route: `/users/${req.params.id}` });
    }
})

userRouter.put('/:id',userSchema,validateRequestSchema,
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const payload:userMapper.UpdateUserDTO = req.body

        const result = await userController.updateOne(id,payload)
        return res.status(200).json({ result, status: 200, msg: "Successfully Updated User" });
    } catch (e) {
        return res.status(404).json({ msg: 'Fail To Update User, Check For User Exists', status: 404, route: `/users/${req.params.id}` });
    }
})

userRouter.post('/', userSchema,validateRequestSchema,
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload:userMapper.CreateUserDTO = req.body

        const result = await userController.createOne(payload)
        console.log('the created user is============>',result);
        return res.status(200).json({ result, status: 200, msg: "Successfully created User" });
    } catch (error) {
        return res.status(400).json({ msg: 'Bad Request,Fail To Create User', status: 400, route: "/users" });
    }
})
export default userRouter;
