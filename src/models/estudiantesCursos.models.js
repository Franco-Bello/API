import { pool } from "../db.js";


//Get: Funcion para mostrar todos los Cursos de un estudiante en la base de datos
export const getCursosEstudiantes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT cursos.*
        FROM estudiantes_cursos
        JOIN cursos ON estudiantes_cursos.curso_id = cursos.curso_id
        WHERE estudiantes_cursos.estudiante_id = ?`,[req.params.estudiante_id]
      )

        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema",
            error: error
        })        
    }
};


//Get: Funcion para mostrar todos los estudiantes de un curso en la base de datos
export const getEstudiantesCursos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT estudiantes.*
        FROM estudiantes_cursos
        JOIN estudiantes ON estudiantes_cursos.estudiante_id = estudiantes.estudiante_id
        WHERE estudiantes_cursos.curso_id = ?`,[req.params.curso_id]
      )

        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema",
            error: error
        })        
    }
};


//Post: Funcion para insertar un estudiante a curso en la base de datos
export const createEstudiantesCursos = async (req, res) => {
    const { estudiante_id, curso_id } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO estudiantes_cursos (estudiante_id, curso_id) VALUES (?, ?)', [estudiante_id, curso_id])
        res.send({ 
            id: rows.insertId,
            estudiante_id,
            curso_id,
         })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema",
            error: error
        })        
    }
};


//DELETE: Funcion para eliminar un estudiante de curso de la base de datos
export const deleteEstudiantesCurso = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM estudiantes_cursos WHERE estudiante_id = ? AND curso_id = ?', [req.params.estudiante_id, req.params.curso_id])
    
        if (result.affectedRows <= 0) return res.status(404).json({
            mensaje: 'no existe'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un problema"
        })        
    }
};



