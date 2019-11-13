
const mysql = require("mysql");
var express = require("express");
var Joi =require("joi");
var prodrouter =  express();
alert("b1");
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


emprouter.delete("/:No",function(request, response){
    let eno = parseInt(request.params.No);
    let query = `delete from emp where no=${eno}`;
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
        
});

emprouter.get("/", function(request, response){
    connection.query("select * from emp", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});


emprouter.get("/", function(request, response){
    connection.query("select * from emp", function(err, result){
        if(err==null)
        {
           myData =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(myData));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});



module.exports = prodrouter;