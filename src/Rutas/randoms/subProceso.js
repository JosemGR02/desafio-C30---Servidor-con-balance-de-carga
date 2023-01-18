
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Subproceso |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { RANDOMS_UTILS } from '../../Utilidades/utils-randoms.js';
// import { generadorNumRandoms } from '../Utilidades/utils-randoms.js';


const resultadoUtils = RANDOMS_UTILS();
// let resultadoUtils = generadorNumRandoms();

// export const resultadoSubproceso = { resultadoUtils };

process.send(`Resultado de la operacion de Utils: ${resultadoUtils}`);

process.exit();