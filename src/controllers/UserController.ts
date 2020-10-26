import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../config/auth.json'

import { User } from '../models/User'

function generateToken (params = {}) { 
    return jwt.sign(params, auth.secret, {
        expiresIn: 86400
    })
}

export default {
    async register (req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body

            if(await User.findOne({ email })) {
                return res.status(400).send({ error: "Usuário já existe" })
            }
            const user = await User.create(req.body)
            user.password = undefined
            return res.json({user, token: generateToken({ id: user.id })})
        }
        catch(err) {
            res.status(400).send({ error: `Erro ao criar usuário ${err}` })
        }
    },

    async authenticated (req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email }).select("+password")

            if(!user) {
                return res.status(400).send({ error: "Usuário não encontrado" })
            }
            
            if(!await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ error: "Senha incorreta" })
            }
            user.password = undefined
            await user.populate("notes").execPopulate()

            return res.send({user, token: generateToken({ id: user.id })})

        }
        catch (err) {
            return res.status(400).send({ error: "Error ao autenticar" })
        }
    }
}