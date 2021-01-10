const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { Decimal128 } = require("bson");
const app = express();
const bodyParser = require("body-parser");


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
const coder = mongoose.model("coder",padawanSchema);

//Renderizado de la pagina
app.get("/", (req,res) => {
    coder.find({},function(err, panas){
        
        res.render("index",{
            padawanList: panas
        })
    })
})

app.post("/", function(req,res){
    let newPadawan = new coder({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        correo: req.body.correo,
        telefono: req.body.telefono
    })

    newPadawan.save();
    res.redirect("/");
})

app.listen(4000, function(){
        console.log("Server is running");
})
