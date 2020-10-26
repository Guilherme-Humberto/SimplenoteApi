import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface Props extends Document {
    name: string,
    email: string,
    password: string,
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})
.pre<Props>("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

export const User = model<Props>("User", UserSchema)
