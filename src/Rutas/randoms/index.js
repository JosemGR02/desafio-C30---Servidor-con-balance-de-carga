
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Randoms |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { Router } from 'express';
import { fork } from 'child_process';

const ruta = Router();  // Por ej: /randoms?cant=20000


ruta.get("/", (solicitud, respuesta) => {
    try {
        const cantidadNumPedidos = solicitud.query.cantidad || 100000000; //probar con 500000000

        const subProceso = fork('./subProceso.js');

        subProceso.send({ success: true, respuesta: cantidadNumPedidos });

        subProceso.on('message', (datosUtils) => {
            const objetoNumAleatorios = Object.entries(datosUtils)
            respuesta.render('view/randoms', { respuesta: objetoNumAleatorios })
        })
    } catch (error) {
        respuesta.send(error, 'Error en la ruta Randoms');
    }
})

export { ruta as RutaRandoms };

