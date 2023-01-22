
import express from 'express';
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import cluster from 'cluster';
import _yargs from 'yargs';
const yargs = _yargs(hideBin(process.argv));
import { INFO_UTILS } from './Utilidades/index.js';
import { RutaRandoms, RutAutenticacion, RutaInfo, RutaServidor } from "./Rutas/index.js";
import { errorMiddleware } from './Middlewares/index.js';
import { PassportAutenticacion } from './Servicios/index.js';
import { hideBin } from 'yargs/helpers';
// import { config } from './Configuracion/config.js';

const app = express();


const mongOptiones = { useNewUrlParser: true, useUnifiedTopology: true }

// Sesion Mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.BASEDATOS_MONGO_URL,
            dbName: process.env.BASEDATOS_MONGO_NOMBRE,
            mongOptiones,
            ttl: 600,
            collectionName: 'sesionesMC',
            autoRemove: 'native'
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        rolling: false,
        cookie: {
            maxAge: 600000,
        },
    })
);

// Passport
PassportAutenticacion.iniciar()
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'))


// Yargs
const args = yargs
    .default({
        modo: "FORK",
        puerto: 8080,
    })
    .alias({
        m: "modo",
        p: "puerto",
    })
    .argv;


// Middleware del error
app.use(errorMiddleware);

// Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set('view engine', 'hbs')
app.set('views', './public/Vistas');
// app.set('views', __dirname + "/view");


// Rutas
app.use('/api/', RutaServidor)
app.use('/api/info', RutaInfo)
app.use('/api/randoms', RutaRandoms)
app.use('/api/autenticacion', RutAutenticacion);


// Modo de ejecucion
if (args.modo == 'CLUSTER') {
    if (cluster.isPrimary) {
        console.log('Ejecucion en Modo Cluster')
        console.log(`Primario corriendo con el id: ${process.pid} -- Puerto ${args.puerto}`);

        for (let i = 0; i < INFO_UTILS.procesadoresdCpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', worker => {
            console.log(`El trabajador con el id:${worker.process.pid} ha finalizado.`);
            cluster.fork();
        });
    } else {
        console.log(`Trabajador iniciado con el id: ${process.pid}`);
    }
} else {
    console.log('Ejecucion en Modo Fork')
}


// Servidor
app.listen(args.puerto, async () => {
    console.log(`Servidor escuchando en el puerto: ${args.puerto}`);
    try {
        await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
        console.log("Conectado a Base de Datos Mongo");
    } catch (error) {
        console.log(`Error en conexión de Base de datos: ${error}`);
    }
})
app.on("error", (error) => console.log(`Error en servidor ${error}`));



