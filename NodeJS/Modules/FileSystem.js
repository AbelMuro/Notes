//---------------------------------------- FILE SYSTEM MODULE ----------------------------------------
/*
	You can use the File System module to manipulate files on the server and from the front-end
*/

//---------------  UPDATING FILES
/* 
	appendFile() will add the specified content to the end of the file
 	writeFile() will replace the file's content with the specified content 
   	For both functions above, if the file doesnt exist, then a new one will be created
*/
    var fs = require("fs");

    fs.appendFile("./nameOfFile.html", 'Hello World!', (err) => { 
        if(err) 
	   console.log(err)
    })

    fs.writeFile("./nameOfFile.html", "hello World", (err) => { 	
        if(err) 
	   console.log(err)                                           
    })



//--------------- READING FILES
/* 
	readFile() will read the contents of a file
*/


    fs.readFile('./nameOfFile.html', (err, data) => {      //reads a file
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data);                                        //data is the actual html that you want to send to the client
        return res.end();                                       
    })


//--------------- OPENING FILES
/* 
	open() will open the contents of a file
 	if the file doesnt exist, then a new one will be created
*/

    fs.open("./nameOfFile.html", (err, file) => {          // (you can add a second argument 'w', it stands for 'writing')
	if(err) 
	   console.log(err) 
    })




//--------------- DELETING FILES
/* 
	unlink() will delete a specified file
*/
    fs.unlink("./nameOfFile.html", (err) => {               //deleting a file
        if(err) 
	   console.log(err) 
    })



//--------------- RENAMING FILES
/* 
	rename() will change the name of an existing file
*/
    fs.rename("./nameOfFile.html", "./newFileName.html", (err) => {
        if(err) 
	   console.log(err) 
    })



//-------------- READ STREAMS
/* 
	createReadStream() will read a file by using a stream to load the content
 	in chunks(a part of the content). This is usefull for reading large files
*/

    const rs = fs.createReadStream("./demofile.txt");             //createReadStream fires an event everytime the file opens or closes
    const chunks = []

    rs.on("open", () => {
        console.log('stream has opened')
    })

    rs.on('data', (chunk) => {
	 chunks.push(chunk);    
    })

    rs.on('error', (e) => {
	 console.log('Error has occurred', e);   
    })

