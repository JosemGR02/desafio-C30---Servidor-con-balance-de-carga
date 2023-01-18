
import express from 'express';
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from 'path';
import dotenv from 'dotenv';
import { config } from './Configuracion/config.js';
import { RutaRandoms, RutAutenticacion, RutaInfo } from "./Rutas/index.js";
import { errorMiddleware } from './Middlewares/index.js';
import { PassportAutenticacion } from './Servicios/index.js';


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


// Dotenv
const configDotenv = { path: path.resolve(__dirname, '.env') }

dotenv.config(configDotenv);

console.log("Datos .Env x Dotenv: ", process.env.BASEDATOS_SELECCIONADA)


// Minimist  ||  Package.json - scripts: "start8080": "node archivo.js -p 8080" 

// import parseArgs from "minimist";

// const options = {
//     default: { puerto: 8080 },
//     alias: {
//         p: 'puerto',
//     }
// }
// const argumentos = parseArgs(process.argv.slice(2), options)
// console.log(argumentos)


// Middleware del error
app.use(errorMiddleware);

// Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set('view engine', 'hbs')
app.set('views', './public/Vistas');
// app.set('views', __dirname + "/view");


// Rutas
app.use('/api/info', RutaInfo)
app.use('/api/randoms', RutaRandoms)
app.use('/api/autenticacion', RutAutenticacion);


// Servidor
app.listen(config.SERVER.PUERTO, async () => {
    console.log(`Servidor escuchando en el puerto: ${config.SERVER.PUERTO}`);
    try {
        await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
        console.log("Conectado a Base de Datos Mongo");
    } catch (error) {
        console.log(`Error en conexión de Base de datos: ${error}`);
    }
})
app.on("error", (error) => console.log(`Error en servidor ${error}`));

