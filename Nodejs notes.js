//Node.js is an open source server environment that allows you to run javascript outside of a browser
//Node.js uses asynchronous programming

// Below is how Node.js handles file requests

// 1) sends the task to the computers file system
// 2) ready to handle the next request
// 3) when the file system has opened and read the file, the server returns the content to the client 

// Node.js eliminates the waiting and simply continues to the next request

// modules are like javascript libraries, a set of pre-built functions that you can use.
// typically, you will use the require() function to access the functions in the modules

// keep in mind that everything below the require() function must go inside the createServer() function





//=========================================================HTTP MODULE=========================================================
// HYPER TEXT TRANSFER PROTOCOL -> all about requests and responses that are done between clients and servers
// http module is the most used module in node.js, it uses http to receive requests and send responses to the client
// below is how you will create a server

// if you are using parcel in the client side...
// 1) npm install -D http-proxy-middleware
// 2) create a .proxyrc configuration file and type in the following json
/* 3) 
    {
        "/": {
            "target": "http://localhost:5000"                    //every request sent by the client will be 
        }                                                        //forwarded to this port
    } 
*/

// if you are using webpack in the client side...
// 1) configure webpack.config file with the following
//  
//        module.exports = {
//            ...
//            devServer: { 
//                port: 3000,
//                proxy: {
//                    '/' : {
//                        target: 'http://localhost:3000',
//                        router: () => 'http://localhost: 5000'         //all requests will be forwarded to this port                                     
//                   }
//               }
//           }
//       }
        


// req is the request object that is sent by the client
// res is the response object that will be sent back to the client
var http = require('http');                                                           
    http.createServer(function(req, res) {
        //check out the boilerplate code far below
    }).listen(5000);





//=========================================================URL MODULE=========================================================
var url = require('url');                                       //used for formating the url of the website
    var adr = 'http://localhost:8080/default.htm?year=2017&month=february';  //normally you would use 'req.url' to get the url
    var q = url.parse(adr, true)                                //parsing the url into an object
    q.host;                                                     //returns 'localhost:8080' (domain name)
    q.pathname;                                                 //returns 'default.htm'
    q.search;                                                   //returns '?year=2017&month=february'
    q.query;                                                    //returns an object { year: 2017, month: february}


    let filename = q.pathname;                                              
    formattedUrl = formattedUrl.year + " " + formattedUrl.month; 







//=========================================================FILE SYSTEM MODULE=========================================================
var fs = require("fs");
    //updating files (be careful with writeFile())
    fs.appendFile("./nameOfFile.html", 'Hello World!', function (err) { //appending content "hello world "to the end of a file, if the file doesnt exist, then a new one will be created 
        if(err) throw err;
    })
    fs.writeFile("./nameOfFile.html", "hello World", function (err) { //replacing a file with the same name as the first argument and appending 'hello world' at the end of the new file, 
        if(err) throw err;                                            //if the file doesnt exist, then a new one will be created
    })
    //reading files
    fs.readFile('./nameOfFile.html', function(err, data) {      //reads a file
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data);                                        //data is the actual html that you want to send to the client
        return res.end();                                       //should return the res.end()
    })
    fs.open("./nameOfFile.html", function(err, file) {          //opening a file, if the file doesnt exist, then a new one will be created   (you can add a second argument 'w', it stands for 'writing')
        if (err) throw err;
    })
    //deleting files
    fs.unlink("./nameOfFile.html", function(err){               //deleting a file
        if(err) throw err;
    })
    //renaming files
    fs.rename("./nameOfFile.html", "./newFileName.html", function(err) { //renaming an existing file
        if(err) throw err;
    })
    var rs = fs.createReadStream("./demofile.txt");             //createReadStream fires an event everytime the file opens or closes
    rs.on("open", function() {
        //do something here
    })





//============================================================== EVENTS MODULE=============================================================================
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 






//============================================================= FORMIDABLE MODULE =========================================================================
//this module was designed to read form data

var formidable = require('formidable');                                     //npm install formidable

    //getting files from client
    http.createServer(function (req, res) {
        if(req.url == "/fileupload"){
            var form = new formidable.IncomingForm();                       //creating a form object to read form data
            form.parse(req, function (err, fields, files) {                 //'files' object is for files uploaded by the client, and 'fields' object are for user input sent by the client
                var oldpath = files.filetoupload.filepath;                  //getting the name of the file that was uploaded
                var newpath = "C:/Users/abelm/" + files.filetoupload.originalFilename; //defining a directory for the file to be stored onto local pc
                fs.rename(oldpath, newpath, function (err) {                //using fs.rename() to place the uploaded file onto the local machine
                    if(err) throw err;
                    res.write('File has been uploaded and moved to a different directory!');
                    res.end();
                })
            })
        }
        else{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();        
        }
    }).listen(8080);      
    

    //getting user-input from client
    http.createServer(function (req, res) {
        if(req.url == "/sendInput"){
            var form = new formidable.IncomingForm();                       //creating a form object to read form data                
            form.parse(req, function (err, fields, files) {                 //'files' object is for files uploaded by the client, and 'fields' object are for user input sent by the client
                res.write("you entered" + fields.userInput)                 //using the name property of the input element to retrieve user input   
                return res.end();
            })
        }
        else{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write('<form action="sendInput" method="post">');
            res.write('<input type="text" name="userInput">');              //this works for all inputs, as long as the input has a name attribute
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();        
        }

    })

//============================================================= EMAIL MODULE ===========================================================

//you can use this mail module to send emails from the server
var nodemailer = require('nodemailer');


http.createServer(function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',                       //keep in mind that google doesnt support less secure apps using its service
        auth: {                                 //so you have to use an app password to make this work
            user: "abelmuro93@gmail.com",       
            pass: "vewyvdjgpbdckqak"                        
        }
    })

    var mailOptions = {                         
        from: 'abelmuro93@gmail.com',          
        to: 'abelmuro93@gmail.com, anotherEmail@gmail.com',
        subject: 'Subject',
        text: 'Content'                                             // keep in mind that you can remove 'text:' and use 'html:' to include html in the body of the email
    };                                                              // html: '<h1> Welcome </h1> <p> Hello World! </p>'

    transporter.sendMail(mailOptions, function(err, info){          //sending the actual email
        if(err){
            console.log(err)
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("email was not sent");
            res.end()
        }
        else{
            console.log("Email sent: " + info.response)
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write("email was sent");
            res.end();
        }
    })
   
}).listen(8080);   





//============================================================== NPM MODULES ==============================================================
//keep in mind that you can also include packages/modules from NPM

var uc = require('upper-case');                     //npm install upper-case
uc.upperCase("hello world");











//========================================================= BOILERPLATE CODE ============================================================================================

var http = require("http");
var url = require("url");


http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename= "." + q.pathname;                         //remember that q.pathname = /nameOfFile.html

    fs.readFile(filename, function(err, data) {
        if(err) {
            res.writeHead(404, {"Content-Type" : "text/html"}) //error handling
            return res.end("404 Not Found")                
        }
        res.writeHead(200, {'Content-Type' : "text/html"});  //defines the content type that will be sent to the client.. 200 is a status code that means everything is ok, 404 is a status code that means something is wrong
        res.write(data);
        return res.end();                                    //we end the response here   
    })

}).listen(8080);                                             //the server listens on port '8080'                           




//=============================================================== EXPRESS WEB FRAMEWORK =================================================================
//middleware, a function that does something between the server receiving a request and sending a response 

// if you are using parcel in the client side...
// 1) npm install -D http-proxy-middleware
// 2) create a .proxyrc configuration file and type in the following json
/* 3) 
    {
        "/": {
            "target": "http://localhost:5000"                    //every request sent by the client will be 
        }                                                        //forwarded to this port
    } 
*/

// if you are using webpack in the client side...
// 1) configure webpack.config file with the following
//  
//        module.exports = {
//            ...
//            devServer: { 
//                port: 3000,
//                proxy: {
//                    '/' : {
//                        target: 'http://localhost:3000',
//                        router: () => 'http://localhost: 5000'         //all requests will be forwarded to this port                                     
//                   }
//               }
//           }
//       }
 

const express = require('express');
const app = express();                                        //creating an object that represents the main app
const bodyParser = require('body-parser');                    //npm install body-parser, this will parse all incoming fetch() requests

// 'get' requests
app.get('/', (req, res) => {                                 // .get() is for handleling 'get' requests from the client
    res.send('hello world');                                 
})
// app.use will bind a middleware for the path '/contantPage'
app.use('/contactPage', () => {                              // .use() is a function that will 'use' the function on the second argument
})                                                          // everytime the user opens an url with /contactPage, EXAMPLE: www.example.com/contactPage



app.listen(5000);                                            //listens to port 5000
