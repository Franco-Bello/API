//Funciones que controlan lo que pasa en las rutas cursos

import { pool } from "../db.js";

//Get: Funcion para mostrar todos los cursos en la base de datos
export const getCursos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cursos')

        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })                
    }
};



//Funcion para mostrar un curso
export const getCurso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cursos WHERE curso_id = ?', [req.params.curso_id])

        if (rows.length <= 0) return res.status(404).json({
            mensaje: 'curso no encontrado'
        })
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



//Funcion para crear un curso
export const createCursos = async (req, res) => {
    const { nombre, descripcion } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)', [ nombre, descripcion ])
        res.send({ 
            id: rows.insertId,
            nombre,
            descripcion,
         })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



//Funcion para actualizar cursos
export const updateCursos = async (req, res) => {
    const { curso_id } = req.params
    const { nombre, descripcion } = req.body
    try {
        const [result] = await pool.query('UPDATE cursos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion) WHERE curso_id = ?', [nombre, descripcion, curso_id])
    
        if (result.affectedRows === 0) return res.status(404).json({
            mensaje: 'curso no encontrado'
        })
        
        const [rows] = await pool.query('SELECT * FROM cursos WHERE curso_id = ?', [curso_id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



//Funcion para eliminar profesores
export const deleteCursos = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM cursos WHERE curso_id = ?', [req.params.curso_id])
    
        if (result.affectedRows <= 0) return res.status(404).json({
            mensaje: 'cursos no encontrado'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};