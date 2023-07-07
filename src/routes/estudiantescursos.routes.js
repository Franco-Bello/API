import { Router } from "express";
import { getEstudiantesCursos, getCursosEstudiantes, createEstudiantesCursos, deleteEstudiantesCurso} from "../models/estudiantesCursos.models.js"

import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();


router.get('/estudiantes/cursos/:estudiante_id', getCursosEstudiantes);

router.get('/cursos/estudiantes/:curso_id', getEstudiantesCursos);

router.post('/cursos/:curso_id/estudiantes/:estudiante_id', 
    [
        check('estuduainte_id', 'El id es obligatorio').not().isEmpty(),
        check('curso_id', 'El id es obligatorio').not().isEmpty(),
        validarCampos,
    ],
createEstudiantesCursos);

router.delete('/cursos/:curso_id/estudiantes/:estudiante_id', deleteEstudiantesCurso);


export default router