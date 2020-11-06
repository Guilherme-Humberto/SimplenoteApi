import { Request, Response } from 'express'
import { Note } from '../models/Note'

export default {
    async list (req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params
        const notes = await Note.find({ user: user_id }).populate("user")
        return res.json(notes)
    },

    async listfavorites (req: Request, res: Response): Promise<Response> {
        const { favorite } = req.query
        const notes = await Note.findOne({ favorite })
        return res.json(notes)
    },

    async getByID (req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const notes = await Note.findById(id)

        return res.json(notes)
    },

    async create (req: Request, res: Response): Promise<Response> {
        const { title, note, createAt } = req.body
        const { user_id } = req.params

        const notes = await Note.create({
            user: user_id,
            title,
            note,
            favorite: false,
            createAt
        })

        return res.json(notes)
    },

    async delete (req: Request, res: Response) {
        await Note.findByIdAndDelete(req.params.id)
    },

    async favoriteupdate (req: Request, res: Response) {
        await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    },

    async noteUpdate (req: Request, res: Response) {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json(note)
    }, 

}