//Rutas
import { Router } from "express";
import { getProfesores, getProfesor, createProfesores, deleteProfesores, updateProfesores } from "../models/profesores.models.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();


//Rutas de profesores
router.get('/profesores', getProfesores);

router.get('/profesores/:id', getProfesor);

router.post('/profesores',
    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('email', 'El Email esta mal escrito').not().isEmpty().isEmail(),
    validarCampos,
    ],
createProfesores);

router.patch('/profesores/:id',
    [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('email', 'El Email esta mal escrito').not().isEmpty().isEmail(),
    validarCampos,
    ],
updateProfesores);

router.delete('/profesores/:id', deleteProfesores);

export default router
