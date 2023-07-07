//Rutas

import { Router } from "express";
import { getEstudiantes, createEstudiantes, updateEstudiantes, deleteEstudiantes, getEstudiante } from "../models/estudiantes.models.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();


//Rutas de estudiantes
router.get('/estudiantes', getEstudiantes);

router.get('/estudiantes/:estudiante_id', getEstudiante);

router.post('/estudiantes',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('grado', 'El grado debe ser obligatotio').not().isEmpty(),
        validarCampos,
    ],
createEstudiantes);

router.patch('/estudiantes/:estudiante_id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('grado', 'El grado debe ser obligatotio').not().isEmpty(),
        validarCampos,
    ],
updateEstudiantes);

router.delete('/estudiantes/:estudiante_id', deleteEstudiantes);


export default router