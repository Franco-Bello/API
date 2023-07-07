//Funciones que controlan lo que pasa en las rutas estudiantes

import { pool } from "../db.js";


//Get: Funcion para mostrar todos los estudiantes en la base de datos
export const getEstudiantes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiantes')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



//Get: Funcion para mostrar un solo estudiante de la base de datos
export const getEstudiante = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiantes WHERE estudiante_id = ?', [req.params.estudiante_id])

        if (rows.length <= 0) return res.status(404).json({
            mensaje: 'Estudiante no encontrado'
        })
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



//Post: Funcion para insertar un estudiante a la base de datos
export const createEstudiantes = async (req, res) => {
    const { nombre, edad, grado } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO estudiantes (nombre, edad, grado) VALUES (?, ?, ?)', [ nombre, edad, grado ])
        res.send({ 
            estudiante_id: rows.insertId,
            nombre,
            edad,
            grado,
         })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};


//Put: Funcion para actulizar los datos de un usuario
export const updateEstudiantes = async (req, res) => {
    const { estudiante_id } = req.params
    const { nombre, edad, grado } = req.body

    try {
        const [result] = await pool.query('UPDATE estudiantes SET nombre = IFNULL(?, nombre), edad = IFNULL(?, edad), grado = IFNULL(?, grado) WHERE estudiante_id = ?', [nombre, edad, grado, estudiante_id])

        if (result.affectedRows === 0) return res.status(404).json({
            mensaje: 'estudiante no encontrado'
        })
        
        const [rows] = await pool.query('SELECT * FROM estudiantes WHERE estudiante_id = ?', [estudiante_id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }

};



//DELETE: Funcion para eliminar un usuario de la base de datos
export const deleteEstudiantes = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM estudiantes WHERE estudiante_id = ?', [req.params.estudiante_id])
    
        if (result.affectedRows <= 0) return res.status(404).json({
            mensaje: 'estudiante no encontrado'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};