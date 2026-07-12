import express from 'express'
import Login from '../models/loginModel.js'
const router = express.Router()

//obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const logins = await Login.find()
        res.status(200).json(logins)
    } catch (error) {
        console.error("Error al obtener los usuarios:", error)
        res.status(500).json({ error: "Error al obtener los usuarios" })
        
    }
})

//obtener un usuario por id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const login = await Login.findById(id)
        if(!login){
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        res.status(200).json(login)
    } catch (error) {
        console.error("Error al obtener el usuario:", error)
        res.status(500).json({ error: "Error al obtener el usuario" })
    }
})

//crear un usuario
router.post("/", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body
        const login = new Login({ nombre, correo, password })
        const savedLogin = await login.save()

        if(savedLogin){
            res.status(201).json({message: "Usuario creado correctamente", login: savedLogin})
        }
    } catch (error) {
        console.error("Error al crear el usuario:", error)
        res.status(500).json({ error: "Error al crear el usuario" })
    }
})

// Eliminar un usuario por id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletedLogin = await Login.findByIdAndDelete(id)
        if(!deletedLogin){
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        res.status(200).json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        console.error("Error al eliminar el usuario:", error)
        res.status(500).json({ error: "Error al eliminar el usuario" })
    }
})

// Editar un usuario por id
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { nombre, correo, password } = req.body
        const editedLogin = await Login.findByIdAndUpdate(id, { nombre, correo, password }, { new: true })
        if(!editedLogin){
            return res.status(404).json({ error: "Usuario no encontrado" })
        }
        res.status(200).json({ message: "Usuario editado correctamente", login: editedLogin })
    } catch (error) {
        console.error("Error al editar el usuario:", error)
        res.status(500).json({ error: "Error al editar el usuario" })
    }
})

export default router