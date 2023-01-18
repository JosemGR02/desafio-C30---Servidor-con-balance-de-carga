
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Autenticacion |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import passport from "passport";
import { Router } from "express";
import { estaAutenticado } from "../../Middlewares/index.js";


const ruta = Router();


// Inicio/Home
ruta.get("/", estaAutenticado, (solicitud, respuesta) => {
    respuesta.render("view/login");
});

// Inicio Sesion
ruta.get("/login", estaAutenticado, (solicitud, respuesta) => {
    respuesta.render("view/login");
});

ruta.post("/login", passport.authenticate("inicioSesion", { failureRedirect: "/errorlogin" }),
    (solicitud, respuesta) => {
        res.redirect("/");
    }
);

// Registrarse
ruta.get("/signup", (solicitud, respuesta) => {
    respuesta.render("view/signup");
});

ruta.post("/signup", passport.authenticate("registrarse", { failureRedirect: "/erroregister" }),
    (solicitud, respuesta) => {
        res.redirect("/");
    }
);

// Cerrar Sesion
ruta.get("/logout", (solicitud, respuesta) => {
    const { email } = solicitud.usuario;
    solicitud.logout();
    respuesta.render("view/logout", { email });
});

// Rutas Errores
ruta.get("/error-login", (solicitud, respuesta) => {
    console.log("Error en login")
    respuesta.render("view/error-login", {});
});

ruta.get("/error-signup", (solicitud, respuesta) => {
    console.log("Error en signup")
    respuesta.render("view/error-signup", {});
});


export { ruta as RutAutenticacion };

