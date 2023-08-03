const lblOnline=document.querySelector("#lblOnline");
const lblOffline=document.querySelector("#lblOffline");
const btnEnviar =document.querySelector("#btnEnviar");
const txtMensaje =document.querySelector("#txtMensaje");
const contenedor=document.querySelector("#contenedor");

const socket=io();// con esta línea se conecta el cliente, viene de la librería

socket.on('connect',()=>{
    //console.log("Conectado.");//se muestra en la consola del navegador. Socket mantiene el estado de comunicación con nuestro server
    lblOffline.style.display="none";
    lblOnline.style.display="";
})

socket.on('disconnect',()=>{  //socket on es para escuchar un evento
    //console.log("Desconectado");
    lblOffline.style.display="";
    lblOnline.style.display="none";
})

socket.on('enviar-mensaje',(payload)=>{  // escucho el emit del server
    console.log(payload);
    const mensaje =document.createElement("p");
    mensaje.innerHTML=payload.mensaje;
    contenedor.appendChild(mensaje);

})

btnEnviar.addEventListener('click',()=>{
    const mensaje=txtMensaje.value;
    const payload={
        mensaje,
        id:'123ABC',
        fecha: new Date().getTime()
    }
    //socket.emit('enviar-mensaje',mensaje);
    socket.emit('enviar-mensaje',payload, (id)=>{
        console.log("desde el server",id);
       

    }); // socket emit es para emitir un evento. Acá definí el evento "enviar-mensaje" ==> tiene q haver algo que lo escuche, el servidor tiene q escuchar esto. en nuestro server, siempre dentro de la conexión, wahí pongo el listener
})