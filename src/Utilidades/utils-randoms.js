
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Randoms Utils |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// array del total de numeros aleatorios generados
const totalNrosGenerados = [].sort((a, b) => a - b);

// objeto final (le paso a el subproceso)
const objetoUtils = {}

// objeto clave valor
const objetoClaveValor = {}

// arrays para contar repeticion de numeros
const arrayNrosSinRepetir = [];
const arrayNrosRepetidos = [];

let contador = 1;


const generadorNumRandoms = (cantidadNumPedidos) => {

    if (cantidadNumPedidos) {
        for (let a = 0; a < cantidadNumPedidos; a++) {
            const numerosRandoms = Math.round(Math.random() * (1 - 1000) + 1)

            if (totalNrosGenerados[numerosRandoms]) {
                totalNrosGenerados[numerosRandoms]++
            } else {
                totalNrosGenerados[numerosRandoms] = 1;
            }
            return totalNrosGenerados;
        }
    } else {
        console.log("Error, cantidadNumPedidos no existe");
    }

    if (totalNrosGenerados.length) {
        for (let b = 0; b < totalNrosGenerados.length; b++) {
            if (totalNrosGenerados[b + 1] === totalNrosGenerados[b]) {
                contador++;
            } else {
                arrayNrosSinRepetir.push(totalNrosGenerados[b]);
                arrayNrosRepetidos.push(contador);
                contador = 1;
            }
            return arrayNrosSinRepetir, arrayNrosRepetidos;
        }
    } else {
        console.log("Error, no hay nada guardado en arrayTotalNumeros");
    }

    for (let c = 0; c <= arrayNrosSinRepetir.length; c++) {
        const elNumero = arrayNrosSinRepetir[c];
        const vecesRepetido = arrayNrosRepetidos[c];

        console.log("El numero " + elNumero + " se repitio " + vecesRepetido + "veces");

        objetoClaveValor.numero = elNumero;
        objetoClaveValor.valor = vecesRepetido;

        if (!c == arrayNrosSinRepetir.length) {
            console.log("Error, todavia no se pasaron todos los datos a objetoClaveValor");
        } else {
            return objetoClaveValor;
        }
    }

    objetoUtils.todosLosNumeros = totalNrosGenerados;
    objetoUtils.vecesRepetidos = objetoClaveValor;

    console.log(objetoUtils);
    return objetoUtils;
}

// export const RANDOMS_UTILS = { generadorNumRandoms };

process.on('message', (datosUtils) => {
    process.send(generadorNumRandoms(datosUtils))
})

// process.send({ 'message': objetoUtils });

process.exit();


