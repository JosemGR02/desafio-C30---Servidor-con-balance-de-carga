



/------------------------|HELP argumentos|----------------------------/,





    /------------------------|HELP Ivan|----------------------------/


// ----------------------Configurando minimist---------------------------//

const options = {
    default: { puerto: 8080, modo: false },
    alias: {
        p: 'puerto',
        m: 'modo'
    }
}
const process_arguments = minimist(process.argv.slice(2), options)

//----------------------------------------------------------------------------//

const PORT = process_arguments.puerto;

// modo cluster 

import cluster from 'node:cluster';
import os from 'os';
const cpuCount = os.cpus().length;







// si se pasa -m cluster como argumento el servidor inicia modo cluster, de lo contrario inicia normal.

if (process_arguments.modo == 'cluster') {

    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
        console.log('modo cluster')

        // Fork workers.
        for (let i = 0; i < cpuCount; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        // Workers can share any TCP connection
        // In this case it is an HTTP server

        const srv = app.listen(PORT, async () => {
            console.log(`Servidor express escuchando en el puerto ${srv.address().port}`);
            try {
                await mongoose.connect(process.env.MONGO_DB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log("Connected DB");
            } catch (error) {
                console.log(`Error en conexión de Base de datos: ${error}`);
            }
        });
        srv.on("error", (error) => console.log(`Error en servidor ${error}`));


        console.log(`Worker ${process.pid} started`);
    }

} else {

    const srv = app.listen(PORT, async () => {
        console.log(`Servidor express escuchando en el puerto ${srv.address().port}`);
        try {
            await mongoose.connect(process.env.MONGO_DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected DB");
        } catch (error) {
            console.log(`Error en conexión de Base de datos: ${error}`);
        }
    });
    srv.on("error", (error) => console.log(`Error en servidor ${error}`));

}






//----------------------------------------------------------------------------//


/------------------------|HELP Lau|----------------------------/

import cluster from 'cluster';
import { INFO } from './utils/index.js';

import parseArgs from 'minimist';
const args = parseArgs(process.argv.slice(2))
const CLUSTER = args.CLUSTER






if (CLUSTER) {
    if (cluster.isPrimary) {
        console.log(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`);

        for (let i = 0; i < INFO.numeroCPUs; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            console.log(`Worker ${worker.process.pid} finalizado.`);
            cluster.fork();
        });
    } else {
        console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    console.log(`No es un cluster`);
}














import express from 'express';
import cluster from 'node:cluster';
import os from 'os';
const nrosCPU = os.cpus().length


// const PORT = process.argv[2] || 2311

if (cluster.isPrimary) {
    for (let index = 0; index < nrosCPU; index++) {
        cluster.fork()
    }
    // cluster.forEach(element => {
    //     cluster.fork()
    // });
    cluster.on('exit', worker => {
        console.log(`Trabajador ${worker.process.pid} finalizado.`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`SERVIDOR ON ${PORT} - PID ${process.pid} `)
    })
}











// para desafio 29 -30

// YARGS

// const yargs = require("yargs/yargs")(process.argv.slice(2));

// const args = yargs
//     .default({
//         modo: "fork",
//         puerto: 0,
//     })
//     .alias({
//         m: "modo",
//         p: "puerto",
//     })
//     .argv;


// console.log("modo", args.modo)
// console.log("puerto", args.puerto)


// nodemon src/app.js -m cluster -p 8080
// nodemon src/app.js -m fork -p 8080


// MINIMIST


// Minimist  ||  Package.json - scripts: "start8080": "node archivo.js -p 8080"

// const options = {
//     default: { puerto: 8080, modo: fork },
//     alias: {
//         p: 'puerto',
//         m: 'modo',
//     }
// }
// const argumentos = parseArgs(process.argv.slice(2), options)
// console.log(argumentos)






// const parseArgs = require('minimist');

// const options = {
//     default: { modo: 'prod', puerto: 0, debug: false },
//     alias: {
//         m: 'modo',
//         p: 'puerto',
//         d: 'debug',
//         // _:'otros' nose pude
//     }
// }

// const argumentos = parseArgs(process.argv.slice(2), options)

// // node main.js 1 2 3 -m dev -p 8080 -d
// // { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }
// // node main.js 1 2 3
// //{ modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }

// console.log("modo", argumentos.modo)
// console.log("puerto", argumentos.puerto)
// console.log("debug", argumentos.debug)
// console.log("otros", argumentos._)