var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');


http.createServer(function (req, res) {

    if(req.url == "/sendInput"){
        var form = new formidable.IncomingForm();                       
        form.parse(req, function (err, fields, files) {   
            res.write("you entered " + fields.username)              
            res.write("you entered " + fields.password)    
            res.write("you entered " + fields.search);
            res.write("you entered " + fields.textarea);
            res.write("you entered " + fields.selectedOption);   
               
            return res.end();
        })
    }
    else{
        fs.readFile("./Form Notes.html", function(err, data){
            res.write(data);
            return res.end();
        })
    }
}).listen(8080);                                                