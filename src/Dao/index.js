
import { config } from "../Configuracion/config.js";
import { servicioMongoDB } from "../Servicios/index.js";
import { UsuariosMongoBD, UsuariosFileSystem } from "./Usuarios/index.js";


const obtenerDaoSeleccionados = () => {
  switch (config.SERVER.SELECCION_BASEdDATOS) {
    case "mongo": {
      servicioMongoDB.init();
      return {
        DaoUsuario: new UsuariosMongoBD(),
      };
    }
    case "filesystem": {
      return {
        DaoUsuario: new UsuariosFileSystem(),
      };
    }
  }
};

const { DaoUsuario } = obtenerDaoSeleccionados();

export { DaoUsuario };



