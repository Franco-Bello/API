//Servidor de la API

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { pool } from './db.js';

import estudiantesRoutes from './routes/estudiantes.routes.js';
import profesoresRoutes from './routes/profesores.routes.js';
import cursosRoutes from './routes/cursos.routes.js';
import estudiantesCursosRoutes from './routes/estudiantescursos.routes.js'

import { PORT } from './config.js';


const app = express();



app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(express.urlencoded({
        extended: true,
    })
)


//Enrutador de estudiantes
app.use('/api',estudiantesRoutes);

//Enrutador de profesores
app.use('/api',profesoresRoutes);

//Enrutador de cursos
app.use('/api',cursosRoutes)

//Enrutador de Estudiantes-Cursos
app.use('/api',estudiantesCursosRoutes)


//Mensaje si el usuario busca una ruta que no existe
app.use((req, res, next) => {
    res.status(404).json({
        mensaje: "Entrada no encontrada"
    })
})


app.listen(PORT , () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});