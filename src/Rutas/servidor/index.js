
import { Router } from 'express';
import { PUERTO } from '../.././app.js';


const ruta = Router();


ruta.get('/', (solicitud, respuesta) => {
    const fecha = new Date().toLocaleDateString()
    respuesta.send(`Servidor express en corriendo en el PUERTO: (${PUERTO}) -- FUNCA PIOLA :) -- PID (${process.pid}) -- FECHA (${fecha})`)
})


export { ruta as RutaServidor };