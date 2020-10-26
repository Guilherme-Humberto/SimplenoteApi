import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import { router, routerNotes } from './routes/router'
import { connetion } from './database/index'
class App {
    public express: express.Application

    public constructor() {
        this.express = express()
        this.middlewares()
    }

    public middlewares(): void {
        this.express.use(bodyparser.json())
        this.express.use(bodyparser.urlencoded({ extended: false }))
        this.express.use(cors())
        this.express.use(express.json())
        this.express.use(router, routerNotes)
        connetion
    }
}

export default new App()