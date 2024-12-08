import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const registerUsers = async (req: Request, rest: Response): Promise<void> => {
    try {
        const name = req.body.name
        const email = req.body.email
        const lastname = req.body.lastname
        const password = req.body.password

        const userCount = await UserModel.countDocuments({}); 
        const rol = userCount === 0 ? 'administrator' : 'client'

        if (!name || !email || !lastname || !password) {
            rest.status(400).json({
                msg: "Faltan datos para crear un usuario"
            })
            return
        }


        const user = await UserModel.create({
            name,
            email,
            lastname,
            password,
            rol
        })

        const token = jwt.sign(JSON.stringify(user), "Chansawman");

        rest.status(200).json({
            msg: "Usuario registrado con exito", token
        })
        return
    } catch (error) {
        console.log(error);
        rest.status(500).json({
            msg: "Ocurrio un error al crear el usuario"
        })
        return
    }
}

export const singin = async (req: Request, res: Response): Promise<void> => {

    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password })

        if (!user) {
            res.status(400).json({
                msg: "No hay coincidencias en el sistema"
            })
            return;
        }
        const token = jwt.sign(JSON.stringify(user), "Chainsawman");
        res.status(200).json({ msg: "Sesion iniciada con exito", token, user })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Ocurrio un error al iniciar sesion"
        })
        return;
    }

}

