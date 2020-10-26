import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json'

export default (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ error: "Nenhum token encontrado" })
    }

    const parts = authHeader.split(' ');

    if(parts.length != 2) {
        return res.status(401).send({ error: "Erro no token" })
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Formato do token inválido" })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: "Token inválido" })
        }

        req.userId = decoded.id
        return next();
    })
}