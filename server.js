//Port del servidor que se enviara a heroku
const PORT = process.env.PORT || 80;
//Librerias que importatemos
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { Decimal128 } = require("bson");
const app = express();
const bodyParser = require("body-parser");

const http = require("http");
const server = http.Server(app);

//Preparacion del ejs
app.set("view engine", "ejs");
mongoose.connect("mongodb+srv://student:1320000Abc12@hackademytest.8xvd0.mongodb.net/hackademy?retryWrites=true&w=majority");

//Archivos estaticos
app.use(bodyParser.urlencoded({encoded:true}));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
//Declaracion del objeto 
const padawanSchema = {
    nombre: String,
    apellidoPaterno: String, 
    apellidoMaterno: String,
    correo: String, 
    telefono: Decimal128
}
//Modelado del objeto
const coder = mongoose.model("coder",padawanSchema);

//Renderizado de la pagina
app.get("https://hackademytest.herokuapp.com", (req,res) => {
    //Obtencion de la información desde mongoDB
    coder.find({},function(err, panas){
        
        res.render("index",{
            padawanList: panas
        })
    })
})

//Envio de la información hacia mongoDB que obtenemos del formulario
app.post("https://hackademytest.herokuapp.com", function(req,res){
    let newPadawan = new coder({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        correo: req.body.correo,
        telefono: req.body.telefono
    })
    //Guardamos la informacion en mongo y redireccionamos a la página  
    //en la que estamos de nuevo
    newPadawan.save();
    res.redirect("https://hackademytest.herokuapp.com");
})
//Prueba para verificar que nuestro servidor esta funcionando correctamente
app.listen(PORT, function(){
        console.log("Server is running");
})
