//insertOne Nos perimte insertar un documento
//use |Nombre de la db| nos permite movernos entre db
//db.getName()c nos permite obtener el nombre de la db en la que estamos trabajando
//insertMany() nos permite insertar más de una coleccion a un documento
//db.nombredeladb.find() nos regresa todos los objetos que existen en la db
var padawan = {
    nombre: "David",
    apellidoPaterno:"Lazaro",
    apellidoMaterno:"Fernandez",
    correo:"davidlazaro20@hotmail.com",
    telefono:9811880331
}
var padawan2 = {
    nombre: "Fernando",
    apellidoPaterno:"Garcia",
    apellidoMaterno:"Gallardo",
    correo:"FerGallardo@hotmail.com",
    telefono:5553444233
}


var user3 ={
    name:"Benjamin",
    lastName: "Lazaro",
    age: 15,
    email: "mecago@hotmail.com"
}

var user4 ={
    name:"Rodolfo",
    lastName: "Ferro",
    age: 24,
    email: "rodo@hotmail.com"
}

var user5 ={
    name:"Fernanda",
    lastName: "Ochoa",
    age: 29,
    email: "ferchoa@hotmail.com"
}

var user6 ={
    name:"Hector",
    lastName: "Marquez",
    age: 20,
    email: "hamglex@hotmail.com"
}


db.users.insertMany([user4,user5,user6])

db.users.find(
    {age:20}, //Criterios, es decir, DONDE "condicion de la consulta"
    {age:false} //Este es el 2do atributo el cual actua como un SELECT
).pretty()  
        //Basta con poner los atributos que queremos mostrar en pantalla
        //Para que podamos verlos, esos los marcaremos con un true o false
        /*Es importante mencionar que en el segundo atributo solo podemos
        realizar 1 operacion a la vez, una INCLUISION o EXCLUSION, es
        decir, solo podermos o poner los campos que queremos ver marcandolos
        con true o simplemente podemos poner los campos que no queremos
        ver, con false como en los siguientes ejemplos*/
 db.users.find(
     {name:"Hector"},
     {name:false}
).pretty()  
/*Esta busqueda mostrara todos los usuarios con nombre Hector
y mostrara todos los campos del documento a excepcion del campo name*/

db.users.find(
    {name:"Hector"},
    {name:true, age:true}
).pretty()  
/*Esta busqueda mostrara todos los usuarios con nombre Hector
y mostrara simplemente los campos name y age*/

/*Si queremos que el resultado que nos arroje
el metodo find sea más bonito al momento de leer, lo que 
podermos hacer es poner al final de la consulta 
la funcion ||.pretty()|| */

//////////Busquedas con el operador $ne - Diferente a...///////////////////////
/*Sintaxis 
db.nombredelaDB.find(
    {
        campo:{
            $ne: valor diferente a 
        }
    }
)
*/

//Ejemplo: Obtengamos todos los usuarios cuya edad sea diferente a 25
db.users.find(
    {
        age:{
            $ne:25
        }    
    }
).pretty()
//////////Busquedas con el operador $eq - Igual a...///////////////////////
/*Sintaxis 
db.nombredelaDB.find(
    {
        campo:{
            $eq: valor diferente a 
        }
    }
)
*/

//Ejemplo: Obtengamos todos los usuarios cuya edad sea igual a 25
db.users.find(
    {
        age:{
            $eq:25
        }    
    }
).pretty()

/*Ahora si solamente queremos encontrar el primer documento que cumpla
con las condiciones de nuestra busqueda utilizaremos el comando 
findOne

NOTA: ESTE METODO NO POSEE LA FUNCION pretty() ya que lo tiene incorborado por defecto
*/

db.users.findOne(
    {
        age:{
            $ne:25
        }    
    }
)
/*Si simplemente ejecutamos el metodo findOne sin argumentos
lo que hara sera regresarnos el primer documento de la colección*/

//////////////Operadores relacionales///////////////////
/** 
 $gt - mayor a
 $gte - mayor o igual a 
 $eq - igual a 
 $ne - no igual 
 $lt - menor a
 $lte - menor o igual a 
*/
db.users.find(
    {
        age:{
            $lte:20
        }
    }
)

//////////Operadores logicos or y and////////
//Obtener todos los usuarios  cuya edad sea mayor a 20 y menor a 25

db.users.find(
    {
        $and:[
            {
                age:{$gt:20}
            },
            {
                age:{$lt:25}
            }
        ]
    }
)

//Obtener todos los usuarios cuyo nombre sea Hector o Fernanda
db.users.find(
    {
        $or:[
            {
                name:{$eq:"David"}
            },
            {
                name:{$eq:"Fernanda"}
            }            
        ]
    }
)