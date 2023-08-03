const socketController=(socket,io)=>{  // socket es el cliente q está conectado. Los clientes van a tener estos listeners q ponga
    console.log("Cliente conectado ",socket.id);
    socket.on('disconnect',()=>{
        console.log("Cliente desconectado ",socket.id);
    })
    socket.on('enviar-mensaje',(payload,cb)=>{ // acá escucho el cliente que me emita "enviar-mensaje"
        //console.log(payload);//generalmente recibimos un payload, info, un objeto y no un mensaje, un string, sino tendría q enviar varios eventos por cada propiedad de un objeto
       // payload.mensaje="respuesta a: "+payload.mensaje+ " desde el server";
   

       const id=12345; // este id me lo debería generar la DB
       //ahora le quiero enviar a la persona
       cb(id);
   // this.io.emit('enviar-mensaje', payload);//no puedo usar this.io acá porque no lo recibí por parámetros y si hago "socket.emit('enviar-mensaje, payloas)" eso solo le va a enviar al cliente que emitió  ==> como le envio a todos los clientes conectados algo?=
  // socket.broadcast.emit('enviar-mensaje',payload); // así se envia un msj a todos los clientes menos al que emitio
   io.emit('enviar-mensaje',payload)    
})
}

module.exports={
    socketController
}