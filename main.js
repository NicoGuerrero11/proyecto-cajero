var cuentas = [
    { nombre: "Marce", saldo: 200, password: '12345' },
    { nombre: "Nico", saldo: 290, password: '1234' },
    { nombre: "Luis", saldo: 67, password: '123' }
];

// definimos las variables
let user = document.getElementById('username')
let password = document.getElementById('password')
let continuar = document.getElementById('btn_continuar')
let vistaHome = document.getElementById("home");
let vistaLogin = document.getElementById("login");
let btnConsulta = document.getElementById('btn_consulta')
let btnIngresa = document.getElementById('btn_ingresa')
let btnRetira = document.getElementById('btn_retira')
let btnSalir = document.getElementById('btn_salir')
let error = document.getElementById('error')
let bienvenida = document.getElementById('bienvenida')


let usuarioInput;

//llamamos las funciones
continuar.addEventListener('click', validarUsuario);
continuar.addEventListener('click', validarSesion);
btnConsulta.addEventListener('click', consulta);
btnIngresa.addEventListener('click', ingresa);
btnRetira.addEventListener('click', retira);
btnSalir.addEventListener('click', salir)

let globalTotal = 0
let reglaTotales = 0

function validarUsuario() {
    switch (user.value) {
        case 'Marce':
            usuarioInput = user.value;
            validarSesion
            break;

        case 'Nico':
            usuarioInput = user.value;
            validarSesion
            break;

        case 'Luis':
            usuarioInput = user.value;
            validarSesion
            break;

        default:
            error.innerHTML = 'Usuario incorrecto'
            user.value = '';
            password.value = ''
            break;
    }
}

function validarSesion() {
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioInput) {
            if (cuentas[i].password === password.value) {
                vistaHome.style.display = "block";
                vistaLogin.style.display = "none";
                bienvenida.innerHTML = 'Bienvenido @' + cuentas[i].nombre

            } else {
                error.innerHTML = 'Contraseña no encontrada'
                password.value = '';
                user.value = '';
            }
        }
    }
}

function salir() {
    vistaHome.style.display = "none";
    vistaLogin.style.display = "block";
    user.value = '';
    password.value = '';
}

function consulta() {
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioInput) {
            if (globalTotal == 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Tu saldo actual es:',
                    text: '$' + cuentas[i].saldo + '.00 MXN',
                })
            } else {
                cuentas[i].saldo = globalTotal

                Swal.fire({
                    icon: 'info',
                    title: 'Tu saldo actual es:',
                    
                    text: '$' + cuentas[i].saldo + '.00 MXN',
                })
            }
        }
    }
}

function ingresa() {
    var saldoIngresado = 0

    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioInput) {
            let saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "Ingresa un monto",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if(result.isConfirmed){
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)
                    if(globalTotal == 0){
                        reglaTotales =  saldoActual + saldoIngresado
                    }else{
                        reglaTotales = globalTotal + saldoIngresado
                    }
                    
                    if( reglaTotales > 990){
                        Swal.fire({
                                icon: 'warning',
                                title:'Aviso',
                                text: 'Al ingresar esa cantidad rebasa el limite',
                            })
                    }else{
                        globalTotal = saldoActual += saldoIngresado
                        
                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Saldo ingresado',
                                text: '$' + saldoIngresado + '.00 MXN',
                                icon: 'info',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            })                      
                        }
                    }
                }else if(result.isDenied){
                    
                }               
                
            });

        }
    }
}

function retira() {
    var saldoIngresado = 0

    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === usuarioInput) {
            let saldoActual = cuentas[i].saldo
            Swal.fire({
                title: "¿Qué cantidad desea retirar?",
                input: 'text',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    saldoIngresado = result.value
                    saldoIngresado = parseFloat(saldoIngresado)

                    if(globalTotal == 0){
                        reglaTotales =  saldoActual - saldoIngresado
                    }else{
                        reglaTotales = globalTotal - saldoIngresado
                    }

                    if (reglaTotales < 10) {
                        Swal.fire({
                            icon: 'warning',
                            title:'Aviso',
                            text: 'No puedes tener menos de $10.00 MXN en tu cuenta',
                        })
                    } else {
                        globalTotal = saldoActual -= saldoIngresado

                        if (saldoIngresado) {
                            Swal.fire({
                                title: 'Monto a retirar',
                                text: '$' + saldoIngresado + '.00 MXN',
                                icon: 'info',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Okay'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    consulta()
                                }
                            }) 

                        }
                    }
                } else if(result.isDenied) {
                    
                }
            });

        }
    }
}