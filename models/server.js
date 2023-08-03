
const express=require('express');
const cors=require('cors');
const { socketController } = require('../sockets/controller');

class Server{
    constructor(){
        this.app=express();
        this.port= process.env.PORT || 3000;
        this.server=require('http').createServer(this.app);//Así creamos el servidor,  un servidor que maneje tanto solicitudes HTTP como comunicación en tiempo real a través de WebSockets. Esta línea crea un servidor HTTP utilizando el módulo http de Node.js y pasa la instancia de la aplicación Express (this.app) como argumento al método createServer. Esto permite que Express maneje las solicitudes HTTP tradicionales.

        //Sin embargo, aún no hemos habilitado Socket.IO para el servidor. 
        //Esta línea importa Socket.IO y lo vincula al servidor HTTP (this.server). Ahora el servidor puede manejar tanto solicitudes HTTP como conexiones en tiempo real utilizando WebSockets a través de Socket.IO.
        this.io=require('socket.io')(this.server);//this.io tiene la info de todos los clientes conectados

        this.middlewares();
        this.paths={};
        this.routes();
        this.sockets();  
        
        
    }
    
    sockets(){
        //this.io.on('connection', socketController)
        this.io.on('connection',(socket)=>socketController(socket,this.io))
    }
    middlewares(){
        this.app.use(cors());//este no es necesario para los sockets io pero si si después queremos implementar q otras aplicaciones puedan hacer peticiones a nuestro server
        this.app.use(express.static('public'));//para establecer un cliente, y al cliente lo voy a probar y desplegar en la carpeta pública
       
    }
    routes(){
     
    }

    listen(){
        this.server.listen(this.port,()=>{console.log("app corriendo");})
    }
}

module.exports=Server;
