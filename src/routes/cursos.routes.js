//Rutas
import { Router } from "express";
import { getCursos, getCurso, createCursos, updateCursos, deleteCursos } from "../models/cursos.models.js";

import { validarCampos  } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();


//Rutas de estudiantes
router.get('/cursos', getCursos);

router.get('/cursos/:id', getCurso);

router.post('/cursos', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
createCursos);

router.patch('/cursos/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        validarCampos,
    ],
 updateCursos);

router.delete('/cursos/:id', deleteCursos);


export default router