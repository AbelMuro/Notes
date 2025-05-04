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



//=========================================================================== MONGOOSE ============================================================================
/*
        Mongoose is a library that uses mongoDB with schemas and models
        -Schemas is like a template that we use to define how a document is going to look like
        -Models are constructors that are used to construct documents based on a schema

        Remember, you need to create a schema and a model in order to create a document

        Go to mongoDB atlas -> select project -> Database -> Clusters -> Select your cluster -> Click on Collections -> Create Database

        STEPS TO INTEGRATE MONGOOSE

                1) npm install mongoose

                2) Write the following lines of code in ./Database/db.js
        
                            const mongoose = require('mongoose');
                            const url = `mongodb+srv://${accountname}:${password}@cluster0.5k5vu.mongodb.net/${name-of-database}?retryWrites=true&w=majority&appName=${name-of-cluster}`;
                                                    //the account name and password can be found in the atlas, SECURITY -> quickstart -> create a user for the database and save the username and password (if one already exists, just use that one)    
                                                    //you may need to check the password in your env variables file in your desktop if you forgot it
        
                            async function connectDB() {
                                try{
                                  await mongoose.connect(url);
                                  console.log('You have connected to the database')
                                }
                                catch(error){
                                  console.log('error', error.message);
                                }
                            }
                            
                            module.exports = connectDB;                                                        //make sure you call this function in the index.js
        
            
                3) Next write the following lines of code in ./Model/Model.js
        
                            const mongoose = require('mongoose');
                            const {Schema} = require('mongoose');
                            
                            const userSchema = new Schema({
                                name: {type: String, required: true},
                                age: {type: Number, required: true},
                                birthday: {type: String, default: 'any string value goes here'}
                            })
        
                            userSchema.pre('save', function(next) {                                              //you can apply middleware to built in methods in mongoose
                                    this.isModified('password');                                                  // build in function that checks if a property in a document has been changed
                            
                                    this.name;
                                    this.age;
                            })
                            
                            const User = mongoose.model('name-of-model', userSchema, 'name-of-collection')        //create a model that will be used to create documents, name of model doesnt have to match
                            
                            module.exports = {
                                User
                            }
*/


//-------------------------------------- OBJECT ID  -----------------------------------------------
/* 
    Mongoose uses ObjectId() to generate a unique ID for every document in the database. 
    If you dont explicitly call ObjectId() for a document, Mongoose will do it for you. 
    Keep in mind, that calling ObjectId() will create an object, not a string.
    You can assign any value to the _id property, but it's recommended to use ObjectId()

            const document = {
                _id: new ObjectId('24 character string'),      // keep in mind, _id is NOT a string, its just an object
                name: 'abel',
                location: 'richmond'
            }
*/


        const mongoose = require('mongoose');
        const ObjectId = mongoose.Types.ObjectId; 


//---------------- Converting ObjectId() into a string representation
/* 
    If you have an ObjectId(), you need to convert the object into a 
    string representation to be able to use it to identify a document 
    in javascript.
*/
        const document = {
            _id: new ObjectId('24 character string'),      // keep in mind, _id is NOT a string, it's just an object
            name: 'abel',
            location: 'richmond'
        }

        const _id = document._id.toString()                // to get the unique identifier, you need to convert the object into a string
        console.log(_id);                                  // this will display '24 character string'




//---------------- Searching with a string representation of ObjectId()
/*
    If you have a string representation of an ObjectId(), you need to convert the
    string into ObjectId() before you can search for documents with it.
*/

        const stringRepresentation = document._id.toString();
        const _id = new ObjectId(stringRepresentation)
        const account = new Account.findOne({_id})



//---------------- Comparing two ObjectId()
/* 
    If you have two ObjectId(), you can compare them by using the .equals() prototype method
*/  
        
        const idOne = new ObjectId();                    //you dont have to pass an argument to the constructor
        const idTwo = new ObjectId('24 character string');
        idOne.equals(idTwo);                             // when comparing two ObjectId, you must use the equals() method








//-------------------------------------- CREATING DOCUMENTS  -----------------------------------------------
/* 
    insertOne() will insert a single document in the collection
    insertMany() will insert multiple documents in the collection
*/

        app.post('/create_document', async (req, res) => {
            const body = req.body;
            const id = new ObjectId(id);
            
            try{
                const newUserTwo = new User({_id: id});                        //you can create a document with a specified _id
                const newUserOne = new User({name: 'Johnathan', age: 2223});
                /* 
                    newUserOne = {
                        _id: new ObjectId('123456789')
                        name: 'Johnathan',
                        age: 2223
                    }
                */
                await newUserOne.save();                                       //the save() method will create a new document in the collection     
                
                const object = await User.insertOne({name: 'whatever', age: 234})
                const array = await User.insertMany([{name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}]);    //this will return an array of the documents(objects), these documents have already been saved into the database                                
                         
            }
            catch(error){
                if(error.message.includes('E11000 duplicate key error collection'))
                    console.log('Document with the specified _id already exists')
                else if(error.message.includes('user validation failed'))
                    console.log('Validation error, document is missing required properties')
            }     
        });


//-------------------------------------- UPDATE DOCUMENTS  -----------------------------------------------
/* 
    updateOne() will look for the first document that satisfies the query and update its properties
    updateMany() will look for ALL documents that satisfies the query and update its properties
    find() will return a cursor that has a single or multiple documents that satisfy the query                //this will return NULL if it doesn't find the document in the collection  
    findOne() will return the document that satisfies the query
*/


        app.put('/update_documents', async (req, res) => {
            const id = new ObjectId(id);
            
            try{
                const user = await User.findOne({id});                                                /* you can also change the properties of a document by using the properties directly*/
                user.name = 'new name';
                user.age = 'new age';
                await user.save();                            
                
                const resultOne = await User.updateOne( { name: 'Alice' }, { $set: { age: 29 } });       // we update the first document that has the property name = 'Alice', and we 'set' the age property to 29
                const resultTwo = await User.updateOne( {_id: id}, { $set: { age: 45 }});                // you can also look for a document with its _id
                const resultThree = await User.updateMany( {name: 'Alice' }, { $set: { age: 56} });      // same as updateOne, but updates all documents that match they query
                
                if(resultOne.modifiedCount === 0)
                    console.log('Document doesnt exist')
            }
            catch(error){
                console.log(error.message)
            }
        })





//-------------------------------------- GET DOCUMENTS -----------------------------------------------
/* 
        find() will return a cursor that has a single or multiple documents that satisfy the query                this will return NULL if it doesn't find the document in the collection
        findOne() will return the document that satisfies the query
*/


        app.get('/get_documents', async () => {
            const id = new ObjectId('24 character id string goes here');
            
            try{
                const user = await User.findOne({name: 'John'});                //looks for the first occurence of a document that has a property name and value john
                const anotherUser = await User.findOne({_id: id});                //you can also look for a document with its _id
                const users = await User.find({age: 22});                        //looks for ALL occurences of the document that has a property name and value john                                                 
                const users = await User.find();                                 //gets ALL documents within a collection
                
                if(!user)
                    console.log('document doesnt exist');
            }
            catch(error){
                if(error.message.includes('user validation failed'))
                    console.log('Validation error, document is missing required properties')
            }
        
        })


//-------------------------------------- DELETE DOCUMENTS -----------------------------------------------
/* 
        deleteOne() will look for the first document that satisfies the query and delete it
        deleteMany() will look for ALL documents that satisfies the query and delete them all
        findOneAndDelete() will look for the first document that satisfies the query, delete it, 
            and return the deleted object
*/

        app.delete('/delete_document:id', async (req, res) => {
            const id = req.params.id;
            const idToDelete = new ObjectId(id);
            
            try{
                const resultOne = await User.deleteOne({_id: idToDelete});                //this will delete the first occurence of the specified document
                const resultTwo = await User.deleteOne({name: 'John'});
                const resultTwo = await User.deleteMany({name: 'Johnathan'});             //this will delete ALL occurences of the specified document
                const resultThree = await User.deleteMany({});                            //this will delete ALL documents in the collection
                const documentDeleted = await User.findOneAndDelete({_id: 'some id'})     //this will delete the document and return it
                
                if(resultOne.deletedCount === 0)
                    console.log('document doesnt exist');
            }
            catch(error){ 
                if(error.message.includes('user validation failed'))
                    console.log('Validation error, document is missing required properties')
            }     
        })  





//-------------------------------------- UPLOADING FILES -----------------------------------------------
/* 
    You can upload images and files in a document with GridFSBucket module in mongoDB
    GridFSBucket will split a file into chunks and store them in MongoDB
    The chunks are grouped into two collections in the mongoDB database,  fs.files and fs.chunks
    fs is the default bucket name, you can specify a different name in     new GridFSBucket(conn.db, {bucketName: 'image'});
    fs.files contains all the metadata of the file; filename, upload date, content type
    fs.chunks contains all the binary data of the file
    once the collections have been made, we save a reference (writestream.id) of the image into a document in mongoDB
*/

        const mongoose = require('mongoose');
        const { GridFSBucket} = require('mongodb');

        const initializeGridFs = (req, res, next) => {                      // 1) we create a middleware that initiates the GridFSBucket
            const conn = mongoose.connection;
            const gfs = new GridFSBucket(conn.db, {bucketName: 'image'});
            req.gfs = gfs;
            next();
        };

        app.post('/add_files_to_document', initializeGridFs, async (req, res) => {
            const image = req.file;                                         // 2) look at your fetch notes on how to receive files from the front-end
            const gfs = req.gfs;

            try{
                const user = new User({email, password});

                if(image){
                      const writestream = gfs.openUploadStream(            // 3) we create a writestream, its a way of handling data by diving it into smaller chunks
                          image.originalname, {                               
                          contentType: image.mimetype
                      });
                    
                      writestream.end(image.buffer);                        // 4) Once the writestream has finished, we get the image buffer(the raw binary data for the image) and store the data into the database
                    
                      writestream.on('finish', async () => {
                            user.imageId = writestream.id;           // 5) we update the user document with the ID of the writestream (this returns a string) )
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




//-------------------------------------- DOWNLOAD FILES  -----------------------------------------------
/* 
    You can download the files from the document with the GridFSBucket module in mongoDB

*/

        const mongoose = require('mongoose');
        const { GridFSBucket} = require('mongodb');

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
                const imageId = user.imageId;                            //this contains the id for the image (its just a 'new ObjectId()')
        
                if(image){
                    const _id = new mongoose.Types.ObjectId(imageId);    //convert the _id into an objectId
                    const cursor = gfs.find({_id});                      //we look for the file in the files collection (cursor is just a pointer to the file in the collecton)
                    const files = await cursor.toArray();                //we get all the metadata from the file and store it within an array
                    const file = files[0];                        
                    const chunks = [];                                   //the use the chunks array to retrieve each chunk of the file
                    const readstream = gfs.openDownloadStream(_id);      //we initialize a read stream that is used to download the file from the chunks collection
        
                    readstream.on('data', (chunk) => {                   //we get each chunk of the file and store it in the array
                        chunks.push(chunk);
                    })
        
                    readstream.on('end', () => {
                        const fileBuffer = Buffer.concat(chunks);       //Buffer.concat() puts together all the binary data chunks into a single chunk
                        res.status(200).json({
                            username,
                            email,
                            contentType: file.contentType,
                            image: fileBuffer.toString('base64')        //we convert the binary data into a text format (base 64) that can be transmitted safely with JSON
                        })
                    })
        
                    readstream.on('error', (err) => {
                        console.log('Error reading file from MongoDB', err);
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










//======================================================= CHANGE STREAMS ======================================================================
/* 
    You can use the watch() method to detect any changes made to a collection.
    Typically, the watch() method is used with a Schema before assigning it to
    a model. The watch() method will return an 'change stream', this stream will 
    have its event handlers that will be triggered when something happens to 
    the collection (add new document, delete document, change document).

    Look at the Websocket module in Node.js notes for more info on how to integrate
    a mongoDB change-stream with a websocket.

            wss.on('connection', ws => {                                       
                changeStream.on('change', (change) => {                         //once the connection has been established
                    const fullDocument = change.fullDocument;                   //contains the whole document that was added to the collection
                    const operationType = change.operationType;                 //insert document or delete document
                    
                    if(operationType === 'delete'){
                        ws.close();                                             //you can close the websocket connection
                        changeStream.close();                                   //you can close the change stream connection
                    }
                    else
                        ws.send('data must be in json format')                  //This is where you send the changes to the front-end 
                })    
    	    })
*/

        const {Schema} = require('mongoose');
        
        const queueSchema = new Schema({
            player: {type: String, required: true},
        })

        const changeStream = Queue.watch();                                 // this will detect any changes made to the collection (new document, delete document, change document)
        const changeStream = Queue.watch([                                  // this will detect any changes made to a specific document in a collection
                { $match: { 'fullDocument.username' : username } }
            ], { fullDocument: 'updateLookup' });                            

                                                                            
        changeStream.on('change', (change) => {                             // change event will be triggered when the document or collection is updated
            const fullDocument = change.fullDocument;                       // contains the whole document that was updated or added to the collection
            const operationType = change.operationType;                     // will return 'insert' or 'delete'
            changeStream.close();                                           // you can close the change stream connection
        })  












            





//============================================================ HOW TO INTEGRATE MONGODB INTO A NODE.JS APP ========================================================================
/* 
        STEPS TO INSTALL MONGODB

                    1) npm install mongodb

                    2) Go to mongoDB atlas -> select project -> Database -> Clusters -> Select your cluster -> Click on Collections -> Create Database

                    3) Use the following lines of code
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
*/





//-------------------------------------- CREATE DOCUMENT  -----------------------------------------------
/* 
    insertOne() will insert a single document in the collection
    insertMany() will insert multiple documents in the collection
*/
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




            
//-------------------------------------- GET DOCUMENTS  -----------------------------------------------
/* 
        find() will return a cursor that has a single or multiple documents that satisfy the query                this will return NULL if it doesn't find the document in the collection
             toArray() will return an array with all the documents        
             next() will return an object with the first document that satisfies the query
        findOne() will return the document that satisfies the query
*/

        const connectDB = require('./Database/db.js')
        const { ObjectId } = require('mongodb');

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




//-------------------------------------- UPDATE DOCUMENTS  -----------------------------------------------
/* 
    updateOne() will look for the first document that satisfies the query and update its properties
    updateMany() will look for ALL documents that satisfies the query and update its properties
*/

        const connectDB = require('./Database/db.js');
        const { ObjectId } = require('mongodb');

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




//-------------------------------------- DELETE DOCUMENTS  -----------------------------------------------
/* 
        deleteOne() will look for the first document that satisfies the query and delete it
        deleteMany() will look for ALL documents that satisfies the query and delete them all
        findOneAndDelete() will look for the first document that satisfies the query, delete it, 
            and return the deleted object

*/

        const connectDB = require('./Database/db.js');
        const { ObjectId } = require('mongodb');

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


            
//-------------------------------------- REPLACE DOCUMENTS  -----------------------------------------------
/* 
    replaceOne() will find a document with the specified query and replace all properties with the properties specified
*/

        const connectDB = require('./Database/db.js');
        const { ObjectId } = require('mongodb');

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



    















