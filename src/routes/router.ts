import express from 'express'
const router = express.Router()
const routerNotes = express.Router()
import controllerNote from '../controllers/NoteController'
import controllerUser from '../controllers/UserController'
import authMiddleWare from '../middleware/index'

routerNotes.use(authMiddleWare)

routerNotes.get("/notes/:user_id", controllerNote.list)
routerNotes.get("/notesId/:id", controllerNote.getByID)
routerNotes.get("/notes/:id", controllerNote.listfavorites)
routerNotes.post("/notes/:user_id", controllerNote.create)
routerNotes.patch("/notes/:id", controllerNote.favoriteupdate)
routerNotes.delete("/notes/:id", controllerNote.delete)

router.post("/register", controllerUser.register)
router.post("/auth", controllerUser.authenticated)

export {router, routerNotes}