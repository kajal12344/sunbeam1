const mysql = require("mysql");
var express = require("express");
var Joi =require("joi");
var emprouter =  express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '<manager>',
    database : 'mydatabase'
  });

var myData =[];
connection.connect();

function validate(bodyContent)
{
    const schema = {
        "Name": Joi.string().length(6).required(),
        "No": Joi.number().required(),
        "Address": Joi.required()
        };
   return Joi.validate(bodyContent , schema);
}

emprouter.post("/",function(request, response){

    let resultOfValidation= validate(request.body);
    //console.log(resultOfValidation);
    if(resultOfValidation.error==null)
{
    let eno = parseInt(request.body.No);
    let ename = request.body.Name;
    let eddress = request.body.Address; 
    
    let query = `insert into emp values(${eno}, '${ename}', '${eddress}')`;
    console.log(query);

    connection.query(query, function(err, result){
        if(err==null)
        {
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           response.contentType("application/json");
           response.send(err); 
        }
    });
}
else{
    response.contentType("application/json");
    response.send(JSON.stringify(resultOfValidation));
}       
});



module.exports = emprouter;