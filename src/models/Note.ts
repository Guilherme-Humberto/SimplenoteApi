import { Schema, model } from 'mongoose'

const NoteSchema = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    createAt: { type: String },
    favorite: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Note = model("Note", NoteSchema)
