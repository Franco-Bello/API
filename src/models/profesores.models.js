//Funciones que controlan lo que pasa en las rutas profesores

import { pool } from "../db.js";


//Funcion para mostrar profesores
export const getProfesores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM profesores')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
}


//Funcion para mostrar un profesor
export const getProfesor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM profesores WHERE id = ?', [req.params.id])

        if (rows.length <= 0) return res.status(404).json({
            mensaje: 'profesor no encontrado'
        })
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
}



//Funcion para crear un profesor
export const createProfesores = async (req, res) => {
    const { nombre, especialidad, email } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO profesores (nombre, especialidad, email) VALUES (?, ?, ?)', [ nombre, especialidad, email ])
        res.send({ 
            id: rows.insertId,
            nombre,
            especialidad,
            email,
         })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }

}


//Funcion para actualizar profesores
export const updateProfesores = async (req, res) => {
    const { id } = req.params
    const { nombre, especialidad, email } = req.body

    try {
        const [result] = await pool.query('UPDATE profesores SET nombre = IFNULL(?, nombre), especialidad = IFNULL(?, especialidad), email = IFNULL(?, email) WHERE id = ?', [nombre, especialidad, email, id])

        if (result.affectedRows === 0) return res.status(404).json({
            mensaje: 'profesor no encontrado'
        })
        
        const [rows] = await pool.query('SELECT * FROM profesores WHERE id = ?', [id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
}



//Funcion para eliminar profesores
export const deleteProfesores = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM profesores WHERE id = ?', [req.params.id])
    
        if (result.affectedRows <= 0) return res.status(404).json({
            mensaje: 'profesor no encontrado'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
}