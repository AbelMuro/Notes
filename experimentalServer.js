var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');


http.createServer(function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "abelmuro93@gmail.com",
            pass: "vewyvdjgpbdckqak"
        }
    })

    var mailOptions = {
        from: 'abelmuro93@gmail.com',
        to: 'abelmuro93@gmail.com',
        subject: 'email was sent using node.js',
        text: 'hello world'
    };

    transporter.sendMail(mailOptions, function(err, info){
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