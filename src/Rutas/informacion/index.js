

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Informacion |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { Router } from "express";
import { INFO_UTILS } from "../../Utilidades/index.js";


const ruta = Router();


ruta.get("/", (solicitud, respuesta) => {
    try {
        const datos = INFO_UTILS

        respuesta.render('view/info', { success: true, datos });

    } catch (error) {
        respuesta.send(error, 'Error al enviar la informacion: ');
    }
})

export { ruta as RutaInfo };






        // const informacion = {
        //     argumentosEntrada: process.argv.slice(2),
        //     pathEjecucion: process.execPath,
        //     nobrePlataforma: process.platform,
        //     processId: process.pid,
        //     versionNode: process.version,
        //     carpetaDeProyecto: process.cwd(),
        //     memoriaTotalReservada: process.memoryUsage()
        // }
        // respuesta.render('view/info', { success: true, respuesta: informacion });