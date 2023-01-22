
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Randoms |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { Router } from 'express';
import { fork } from 'child_process';

const ruta = Router();  // Por ej: /?cantidad=20000


ruta.get("/:cantidad?", (solicitud, respuesta) => {
    try {
        const cantidadNumPedidos = solicitud.query.cantidad || 100000000; //probar con 500000000

        const subProceso = fork('./src/SubProceso-Fork/index.js');

        subProceso.send(Number(cantidadNumPedidos));

        subProceso.on('message', (resultadoUtils) => {
            console.log({ resultadoUtils })

            respuesta.render("view/randoms", { resultadoUtils })
        })
    } catch (error) {
        respuesta.send(error, 'Error en la ruta Randoms');
    }
})

export { ruta as RutaRandoms };



