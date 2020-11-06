import express from 'express'
const router = express.Router()
const routerNotes = express.Router()
import controllerNote from '../controllers/NoteController'
import controllerUser from '../controllers/UserController'
import authMiddleWare from '../middleware/index'

routerNotes.use(authMiddleWare)

router.get("/notes/:user_id", controllerNote.list)
router.get("/notesId/:id", controllerNote.getByID)
router.get("/notes/:id", controllerNote.listfavorites)
router.post("/notes/:user_id", controllerNote.create)
router.patch("/notes/:id", controllerNote.favoriteupdate)
router.put("/updateNote/:id", controllerNote.noteUpdate)
router.delete("/notes/:id", controllerNote.delete)

router.post("/register", controllerUser.register)
router.post("/auth", controllerUser.authenticated)

export {router, routerNotes}