
import { Router } from 'express';

const ruta = Router();


ruta.get('/', (solicitud, respuesta) => {
    const fecha = new Date().toLocaleDateString()
    respuesta.send(`Servidor express en (${PORT}) -- FUNCA PIOLA :) -- PID (${process.pid}) -- (${fecha})`)
})


export { ruta as RutaServidor };