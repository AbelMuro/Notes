/* 
    MongoDB is a NoSQL database. 
    A cluster is a collection of servers and databases
        -a server in this case is a node that has a specific responsibility, we have three types of nodes
            Primary Node: Manages all write operations and coordinates changes with secondary nodes.
            Secondary Node: Replicate data from the primary and can handle read operations to balance the load.
            Arbiter Node: Participates in elections for selecting a new primary, but doesn't hold data itself.
        -a typically cluster can look like this: 1 primary, 5 secondaries and 1 arbiter node (all these nodes can participate in elections)
        -we have elections for the primary node in case the primary node crashes or is unavailable
        -the 7 nodes will vote for a primary node
    
    A database is a group of collections     
    A collection is a group of documents. 
    A document is similar to a javascript object where it organizes the data with key-value pairs.
      -a key is typically a string and the value is some primitive or non-primitive value
      -below is an example of a document/object in mongoDB

          {
             _id: new ObjectId('7df78ad8902c')                      //every document has an id property that ensures the uniqueness of the document, if you dont provide an _id property, mongo will do it for you
             title: 'MongoDB Overview', 
             tags: ['mongodb', 'database', 'NoSQL'],
             likes: 100, 
        }
*/



//=========================================================================== How to intergrate MONGOOSE in a Node.js ============================================================================
/*
        Mongoose is a library that uses mongoDB with schemas and models
        -Schemas is like a template that we use to define how a document is going to look like
        -Models are constructors that are used to construct documents based on a schema

        Remember, you need to create a schema and a model in order to create a document

        Go to mongoDB atlas -> select project -> Database -> Clusters -> Select your cluster -> Click on Collections -> Create Database

        //insertOne() will insert a single document in the collection
        //insertMany() will insert multiple documents in the collection
        //find() will return a cursor that has a single or multiple documents that satisfy the query            this will return NULL if it doesn't find the document in the collection
            // toArray() will return an array with all the documents        
            // next() will return an object with the first document that satisfies the query
        //findOne() will return the document that satisfies the query
        //updateOne() will look for the first document that satisfies the query and update its properties
        //updateMany() will look for ALL documents that satisfies the query and update its properties
        //deleteOne() will look for the first document that satisfies the query and delete it
        //deleteMany() will look for ALL documents that satisfies the query and delete them all
*/


                //1) npm install mongoose

                //2) Write the following lines of code in ./Database/db.js

                                    const mongoose = require('mongoose');
                
                                     //the account name and password can be found in the atlas, SECURITY -> quickstart -> create a user for the database and save the username and password (if one already exists, just use that one)    
                                    //you may need to check the password in your env variables file in your desktop if you forgot it
                                    const url = `mongodb+srv://${accountname}:${password}@cluster0.5k5vu.mongodb.net/${name-of-database}?retryWrites=true&w=majority&appName=${name-of-cluster}`
                
                                    async function connectDB() {
                                        try{
                                          await mongoose.connect(url);
                                          console.log('You have connected to the database')
                                        }
                                        catch(error){
                                          console.log('error', error.message);
                                        }
                                    }
                                    
                                    module.exports = connectDB;                            //make sure you call this function in the index.js

            
                    //3) Next write the following lines of code in ./Model/Model.js

                                    const mongoose = require('mongoose');
                                    const {Schema} = require('mongoose');
                                    
                                    const userSchema = new Schema({
                                        name: {type: String, required: true},
                                        age: {type: Number, required: true}
                                    })
                                    
                                    const User = mongoose.model('name-of-model', userSchema, 'name-of-collection')        //create a model that will be used to create documents, name of model doesnt have to match
                                    
                                    module.exports = {
                                        User
                                    }


                    //4) Now you can perform CRUD operations
                                    const mongoose = require('mongoose');
                                    const {connectDB, ObjectId} = require('./Database/db.js')
                                    const {User} = require('./Model/Model.js');
                                    const user = new User({email: '', password: ''});
                                    const userData = await user.save();
                                    /* 
                                        userData = {
                                            email: '',
                                            password: '',
                                            _id: new ObjectId()
                                        }
                                    */
                                    const ObjectId = mongoose.Types.ObjectId;              //new ObjectId('24 character id string goes here');     or       new ObjectId()
                                    /*    when comparing two ObjectId, you must use     */
                                    const idOne = new ObjectId();
                                    const idTwo = new ObjectId();
                                    idOne.equals(idTwo); 
                                    
                                    
                                    connectDB();
        
                                    app.post('/create_document', async (req, res) => {
                                        const body = req.body;
                                        const id = new ObjectId(id);
                                        
                                        try{
                                            const newUserOne = new User({name: 'Johnathan', age: 2223});
                                            const newUserTwo = new User({_id: id});                        //you can create a document with a specified _id
                                            const result = await User.insertMany([{name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}]);    //this will return an array of the documents(objects), these documents have already been saved into the database                                
                                            await newUserOne.save();                                       //the save() method will create a new document in the collection                                
                                        }
                                        catch(error){
                                            if(error.message.includes('E11000 duplicate key error collection'))
                                                console.log('Document with the specified _id already exists')
                                            else if(error.message.includes('user validation failed'))
                                                console.log('Validation error, document is missing required properties')
                                        }     
                                    });
        
                                    app.put('/update_documents', async (req, res) => {
                                        const id = new ObjectId(id);
                                        
                                        try{
                                            const user = await User.findOne({id});                                            /* you can also change the properties of a document using property and object syntax*/
                                            user.name = 'new name';
                                            user.age = 'new age';
                                            await user.save();                            
                                            
                                            const resultOne = await User.updateOne( { name: 'Alice' }, { $set: { age: 29 } });      //keep in mind that you can only update the properties that are in the schema
                                            const resultTwo = await User.updateOne( {_id: id}, { $set: { age: 45 }});                 //you can also look for a document with its _id
                                            const resultThree = await User.updateMany( {name: 'Alice' }, { $set: { age: 56} });   //first object is the document that we look for, we update the properties with the second object
                                            
                                            if(resultOne.modifiedCount === 0)
                                                console.log('Document doesnt exist')
                                        }
                                        catch(error){
                                            console.log(error.message)
                                        }
                                    })
        
                                    app.get('/get_documents', async () => {
                                        const id = new ObjectId('24 character id string goes here');
                                        
                                        try{
                                            const user = await User.findOne({name: 'John'});                //looks for the first occurence of the document in the collection
                                            const anotherUser = await User.findOne({_id: id});                //you can also look for a document with its _id
                                            const users = await User.find({age: 22});                        //looks for ALL occurences of the document in the collection                                                 
                                            
                                            if(!user)
                                                console.log('document doesnt exist');
                                        }
                                        catch(error){
                                            if(error.message.includes('user validation failed'))
                                                console.log('Validation error, document is missing required properties')
                                        }
                                    
                                    })
        
        
                                    app.delete('/delete_document:id', async (req, res) => {
                                        const id = req.params.id;
                                        const idToDelete = new ObjectId(id);
                                        
                                        try{
                                            const resultOne = await User.deleteOne({_id: idToDelete});                //this will delete the first occurence of the specified document
                                            const resultTwo = await User.deleteOne({name: 'John'});
                                            const resultTwo = await User.deleteMany({name: 'Johnathan'});            //this will delete ALL occurences of the specified document
                                            
                                            if(resultOne.deletedCount === 0)
                                                console.log('document doesnt exist');
                                        }
                                        catch(error){ 
                                            if(error.message.includes('user validation failed'))
                                                console.log('Validation error, document is missing required properties')
                                        }     
                                    })  

                        //4)  Uploading files to a document in MongoDB
                             // GridFS will split a file into chunks and store them in MongoDB
                             // The chunks are grouped into two collections in the mongoDB database,  fs.files and fs.chunks
                            //          fs is the default bucket name, you can specify a different name in     new GridFSBucket(conn.db, {bucketName: 'image'});
                             // fs.files contains all the metadata of the file; filename, upload date, content type
                             // fs.chunks contains all the binary data of the file
                             // once the collections have been made, we save a reference (writestream.id) of the image into the document in mongoDB

                                    const { GridFSBucket} = require('mongodb');

                                    const initializeGridFs = (req, res, next) => {                    //middleware
                                        const conn = mongoose.connection;
                                        const gfs = new GridFSBucket(conn.db, {bucketName: 'image'});
                                        req.gfs = gfs;
                                        next();
                                    }

                                    app.post('/add_files_to_document', initializeGridFs, async (req, res) => {
                                        const image = req.file;                                    //look at your node.js notes on how to receive files from the front-end
                                        const gfs = req.gfs;

                                        try{
                                            const user = new User({email, password});

                                            if(image){
                                                const writestream = gfs.openUploadStream(image.originalname, {        //we create a writestream, its a way of handling data by diving it into smaller chunks
                                                    contentType: image.mimetype
                                                });
                                                
                                                  writestream.end(image.buffer);                        //we use the writestream by getting the image buffer(the raw binary data for the image) and store the data into the database
                                                
                                                  writestream.on('finish', async () => {
                                                        user.profileImage = writestream.id;           // we update the user document with the ID of the writestream (this returns a string) )
                                                        const userData = await user.save();
                                                        console.log('Image uploaded to MongoDB');                            
                                                  });
                                                
                                                  writestream.on('error', (err) => {
                                                        console.log('Error uploading image:', err);
                                                 });
                                            }
                                        }
                                        catch(error){
                                            const message = error.message;
                                            if(message.includes('E11000 duplicate key error collection:'))
                                                res.status(401).send(message);
                                            else
                                                res.status(500).send(message);
                                        }
                                    })
                            
                          // 5) Get files from documents

                                const initializeGridFs = (req, res, next) => {
                                    const conn = mongoose.connection;
                                    const gfs = new GridFSBucket(conn.db, { bucketName: 'images' });
                                    req.gfs = gfs;
                                    next();
                                }
                                
                                router.get('/get_account', initializeGridFs, async (req, res) => {
                                    const gfs = req.gfs;
                                
                                    try{
                                        const user = await User.findOne({email});
                                        const image = user.profileImage;                    //this contains the id for the image (its just a 'new ObjectId()')
                                
                                        if(image){
                                            const _id = new mongoose.Types.ObjectId(image); //convert the _id into an objectId
                                            const cursor = gfs.find({_id});                 //we look for the file in the files collection (cursor is just a pointer to the file in the collecton)
                                            const files = await cursor.toArray();           //we get all the metadata from the file and store it within an array
                                            const file = files[0];                        
                                            const chunks = [];                             //the use the chunks array to retrieve each chunk of the file
                                            const readstream = gfs.openDownloadStream(_id);  //we initialize a read stream that is used to download the file from the chunks collection
                                
                                            readstream.on('data', (chunk) => {            //we get each chunk of the file and store it in the array
                                                chunks.push(chunk);
                                            })
                                
                                            readstream.on('end', () => {
                                                const fileBuffer = Buffer.concat(chunks);   //Buffer.concat() puts together all the binary data chunks into a single chunk
                                                res.status(200).json({
                                                    username,
                                                    email,
                                                    contentType: file.contentType,
                                                    image: fileBuffer.toString('base64')    //we convert the binary data into a text format (base 64) that can be transmitted safely with JSON
                                                })
                                            })
                                
                                            readstream.on('error', (err) => {
                                                console.log('Error reading file from MongoDB', err);
                                                res.status(200).json({username, email})
                                            })
                                        }  
                                        else
                                            res.status(200).json({username, email});
                                         
                                    }
                                    catch(error){
                                        const message = error.message;
                                        res.status(500).send(message);
                                    }
                                })


//======================================================= WEB SOCKETS AND MONGODB ======================================================================
/* 
    Web sockets are a connection between the front-end and the back-end that allows consistent updates without the need to manually request them
    Typically, web sockets are used to create a connection from a collection in a mongoDB database to the front-end
    Anytime there is an update to that specific collection, the web socket will automatically send the updates to the front end
    Keep in mind that the front-end can also send updates to the back-end

    One way of thinking about this is using Event listeners in the front end. 
    Everytime there is a change in the UI or update to a state, an event listener will be triggered. 
    That event listener will call a function that has access to the updates to the state or changes to the UI
    
*/


// back-end web socket (typically, you want to do this in a Model.js file that creates the models for your mongoDB app)

        const {Schema} = require('mongoose');
        const WebSocket = require('ws');
        
        const queueSchema = new Schema({
            player: {type: String, required: true},
        })
        
        const Queue = mongoose.model('player', queueSchema, 'queue')        //first create your model for the collection you want to detect changes

         //PRODUCTION ONLY!
        const server = https.createServer({                                // this is for production only
            cert: fs.readFileSync('/path/to/ssl/cert.pem'),                // to generate these files, you need to install openSSL (https://slproweb.com/products/Win32OpenSSL.html)
            key: fs.readFileSync('/path/to/ssl/key.pem'),                  // you will also need to download the openssl.cnf file (https://github.com/openssl/openssl/blob/master/apps/openssl.cnf), store it in the same installation folder as Openssl
        });                                                                // then run the following commands     
                                                                           // 1) openssl req -config C:/Users/abelm/openSSL/openssl.cnf -new -x509 -keyout key.pem -out cert.pem
                                                                           // 2) openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem   (the files will be generated in the same directory specified in the command line)
    
                                        //development      //production
        const wss = new WebSocket.Server({port: 8000}  or   {server});                    //second, you create the web socket object (make sure the port is the same for the back-end and the front-end)

        wss.on('connection', ws => {                                        //Third, you establish the connection between the back end and the front end
            console.log('Front-end and back-end are connected');
        
            const changeStream = Queue.watch();                            //This is where you use the Model to create a 'stream' that you can use to create event listeners
            changeStream.on('change', (change) => {                        //you create an event listener here that detects the changes for the collection
                ws.send(JSON.stringify(change))                            //This is where you send the changes to the front-end
            })
        
            ws.on('close', () => {                                        //Event listener that is triggered when the front-end is disconnected from the back-end
                console.log('Client disconnected')
            })
        })



// front-end web socket

        const WEBSOCKET_URL = 'ws://localhost:8000'  or   'wss//my-back-end-domain.com'        //first string is for development, the second is for production

        const onmessageFunction = (event) => {
            const change = JSON.parse(event.data);
            const newDocumentAddedToCollection = change.fullDocument;
        }

        //make sure to call this function within a useEffect()
        const connectToWebSocket = (onmessageFunction) => {                //its a good idea to use callbacks to access the data from the changes detected in the web socket
            const socket = new WebSocket('ws://localhost:8000');            //make sure the port is the same on the web socket in the back-end
        
            socket.onopen = () => {                                        //These are all event listeners
                console.log('Connected to WebSocket server');
            };
        
            socket.onmessage = onmessageFunction;                          // Update your front-end application with the received change
        
            socket.onclose = () => {
                console.log('Disconnected from WebSocket server');
            };
        
            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }






//============================================================ HOW TO INTEGRATE MONGODB INTO A NODE.JS APP ========================================================================


                    //1) npm install mongodb

                    //2) Go to mongoDB atlas -> select project -> Database -> Clusters -> Select your cluster -> Click on Collections -> Create Database

                    //3) Use the following lines of code
                                const { MongoClient, ServerApiVersion } = require('mongodb');

                                const uri = "get uri from your mongoDB cluster:  database -> cluster -> connect";
                        
                                const client = new MongoClient(uri, {
                                      serverApi: {
                                        version: ServerApiVersion.v1,
                                        strict: true,
                                        deprecationErrors: true,
                                      }
                                });
                                
                                async function connectDB() {
                                      try {
                                        // Connect the client to the server
                                        await client.connect();
                                        const db = client.db("name-of-database");
                                        console.log("You successfully connected to MongoDB!");
                                        return db;
                                      } 
                                      catch(error){
                                         console.log(error);
                                      }
                                }
                                
                                module.exports = connectDB;                //make sure you call this function in the index.js


                        //4) Perform CRUD operations with the db object

                            const connectDB = require('./Database/db.js');
                            const { ObjectId } = require('mongodb');



                                app.post('/create_documents', async (req, res) => {
                                    const body = req.body;
                                    const id = new ObjectId('any id goes here');
                                    
                                    try{
                                        const db = await connectDB();
                                        const resultOne = await db.collection('users').insertOne({ name: "Jane", age: 25 });            //insertOne() will insert a new document in the collection
                                        const resultTwo = await db.collection('users').insertOne({ _id: id, name: 'Jane', age: 25});    //you can specify an id property here with the objectId constructor
                                        const resultThree = await db.collection('users').insertMany(([{ name: "Jane", age: 25 }, { name: "Doe", age: 22 }]);    
                                    }
                                    catch(error){
                                        if(error.message.includes('E11000 duplicate key error collection'))
                                            console.log('document with _id already exists')
                                    }
                                })




                                app.get('/get_documents', async (req, res) => {      
                                    const id = new ObjectId('any id goes here');
                                    
                                    try{
                                        const db = await connectDB();
                                        const allUsers = await db.collection('users').find({}).toArray();            //find({}) will find all documents within the collection
                                        const user = await db.collection('users').find({name: "John"}).next();       //this will find a document with the property name and value 'John' 
                                        const anotherUser = await db.collection('users').find({_id: id}).next();     //to find a document with an id, you will need to use the ObjectId constructor  

                                        if(!user)
                                            console.log("document doesn't exist");
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                                })




                                app.put('/update_documents', async (req, res) => {      
                                    const id = new ObjectId('any id goes here');
                                    
                                    try{
                                        const db = await connectDB();
                                        const updateResultOne = await db.collection('users').updateOne({ name: 'Alice' }, { $set: { age: 29 } });       //the $ sign is an atomic operator, we need this to update specific properties of the document
                                        const updateResultTwo = await db.collection('users').updateOne({_id: id}, { $set: { age: 34 } });               //you can also update a document by using its _id
                                        const updateResultThree = await db.collection('users').updateMany({ name: 'Alice' }, { $set: { age: 29 }});     //this will update ALL documents that match the query
                                
                                        if(updateResultOne.modifiedCount === 0)
                                            console.log('Document doesnt exists')
                                        
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                                });



                                app.put('/replace_documents', async (req, res) => {
                                        const id = new ObjectId('any id goes here');                                
                                    
                                        try{
                                            const resultOne = await db.collection('users').replaceOne(
                                                { name: 'Alice' },                                 // we look for a document with the property name: 'Alice'
                                                { name: 'Alice', age: 30, status: 'active' }       // we delete all the old properties of the document and replace them with these properties
                                            );
                                            const resultTwo = await db.collection('users').replaceOne(
                                                {_id: id},                                        //you can also replace a document with its _id
                                                {name: 'Alice', age: 30, status: 'active'}
                                            )

                                            if(resultOne.modifiedCount === 0)
                                                console.log('no document exists')
                                            
                                        }
                                    catch(error){
                                        console.log(error.message)
                                    }
                                })



                                app.delete('/delete_documents:id', async (req, res) => {
                                    const id = req.params.id;
                                    const idToDelete = new ObjectId(id);

                                    try{
                                        const db = await connectDB();
                                        const deleteResultOne = await db.collection('users').deleteOne({ name: 'Alice' });            //we look for a document with the property name: 'Alice' and delete the first occurence
                                        const deleteResultTwo = await db.collection('users').deleteOne({ _id: idToDelete});           //we look for a document with the _id that is specified and delete the first occurence
                                        const deleteResultThree = await db.collection('users').deleteMany({name: 'Alice'});           //we look for all documents with the property name: 'Alice' and delete all occurences

                                        if(deleteResultOne.deletedCount === 0)
                                            console.log('Document doesnt exist')
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                                    
                                })

    















