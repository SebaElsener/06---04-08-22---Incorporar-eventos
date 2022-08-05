
const precioUnitario=32000
const precioLista=35000
let descuentoUnPago=0
const stockMedidaCubiertas=['225/65/17', '225/70/15','265/10/16','195/70/15', '205/65/16']
let datosCliente=[
    {
    nombreApellido: 'PEPE PEREZ',
    dni: '12718765'
    },
    {
    nombreApellido: 'SAMUEL JACKSON',
    dni: '9764312'
    },
    {
        nombreApellido: 'ROQUE PEREZ',
        dni: '2764312'
    }
]
const nombreApellido=document.querySelector('.nombreApellido')
const documentoIdentidad=document.querySelector('.nroDni')
const medida=document.querySelector('.medidaCubiertas')
const cantidad=document.querySelector('.cantidadAcomprar')
const cantCuotas=document.querySelector('.formaPago')
const botonEnviar=document.querySelector('.btn-enviarPedido')
const cajaCompra=document.querySelector('.boxCompra')

//  func para agregar options con datos del array stockMedidaCubiertas al select del formulario
for (let i=0; i<stockMedidaCubiertas.length; i++){
    let option=document.createElement('OPTION')
    option.innerText=stockMedidaCubiertas[i]
    document.querySelector('.medidaCubiertas').append(option)
}

// function constructora pedido
function pedido(nombreApellido, dni, cantidadCubiertas, medidaCubiertas, formaPago) {
    this.nombreApellido=nombreApellido
    this.dni=dni
    this.cantidadCubiertas=cantidadCubiertas
    this.medidaCubiertas=medidaCubiertas
    this.formaPago=formaPago
    this.resultadoCompra=function () {
        let cuadroCompra=document.createElement("DIV")
        cuadroCompra.innerHTML=`<h2>Datos de su compra</h2><p>Nombre y apellido: ${this.nombreApellido}</p>DNI: ${this.dni}<p>Cantidad de cubiertas: ${this.cantidadCubiertas}</p>Medida de cubiertas: ${this.medidaCubiertas}<p>Forma de pago: ${this.formaPago} pago(s)</p><p><strong>Total a pagar: </strong>${this.formaPago} pago(s) de $${pago(parseInt(formaPago))} (Descuento incluído de $${descuentoUnPago})</p>`
        cajaCompra.style.opacity='1'
        document.querySelector('.boxCompra').append(cuadroCompra)
        let btnNuevaCompra=document.createElement('BUTTON')
        btnNuevaCompra.innerHTML='Realizar nueva compra'
        document.querySelector('.boxCompra').append(btnNuevaCompra)
    }
}

// Function para pago
function pago(cantCuotas) {
    console.log(medidaCubiertas, datosCliente, dni, formaPago)
    if(cantCuotas>12){  // Control por si se ingresa más de 12 pagos
        alert('El plan de cuotas es válido sólo hasta 12 pagos.')
        precioTotal='No válido - Intente nuevamente'
    } else if(cantCuotas>1){  // Si es mayor a 1 cuota, automáticamente calcula pago de 2 a 12 cuotas sin interés a precio lista, según ingrese el user
        precioTotal=(precioLista*cantidadCubiertas)/cantCuotas
    } else if (cantidadCubiertas<=0){
        alert('Por favor, ingrese un número valido de cantidad de cubiertas') // Control por si se ingresa una cantidad = o < a cero
    } else if (medidaCubiertas==="" || datosCliente==="" || dni==="" || formaPago===""){
        alert('Por favor, complete todos los datos del formulario')
    } else{  //  Una cuota o pago efectivo con 5% de descuento
        descuentoUnPago=(precioUnitario*cantidadCubiertas*0.05)
        precioTotal=(precioUnitario*cantidadCubiertas)-descuentoUnPago
    }
    return precioTotal
}

//EventListener botón enviar formulario
botonEnviar.addEventListener("click", (e)=>{
    e.preventDefault()
    datosCliente=nombreApellido.value
    dni=documentoIdentidad.value
    cantidadCubiertas=cantidad.value
    medidaCubiertas=medida.value
    formaPago=cantCuotas.value
    const compra=new pedido(datosCliente, dni, cantidadCubiertas, medidaCubiertas, formaPago)
    compra.resultadoCompra()
})