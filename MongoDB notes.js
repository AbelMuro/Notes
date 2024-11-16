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
                                
                                module.exports = connectDB;


                        //3) Perform CRUD operations with the db object
                                //insertOne() will insert a single document in the collection
                                //insertMany() will insert multiple documents in the collection
                                //find() will return a cursor that has a single or multiple documents that satisfy the query            this will return NULL if it doesn't find the document in the collection
                                    // toArray() will return an array with all the documents        
                                    // next() will return an object with the first document that satisfies the query
                                //updateOne() will look for the first document that satisfies the query and update its properties
                                //updateMany() will look for ALL documents that satisfies the query and update its properties
                                //deleteOne() will look for the first document that satisfies the query and delete it
                                //deleteMany() will look for ALL documents that satisfies the query and delete them all

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


//=========================================================================== MONGOOSE ============================================================================
/*
        Mongoose is a library that uses mongoDB with schemas and models
        -Schemas is like a template that we use to define how a document is going to look like
        -Models are constructors that are used to construct documents based on a schema

        Remember, you need to create a schema and a model in order to create a document
*/


                //1) npm install mongoose

                //2) Write the following lines of code in ./Database/db.js

                    const mongoose = require('mongoose');

                    const url = `mongodb+srv://${accountname}:${password}@cluster0.5k5vu.mongodb.net/${name-of-database}?retryWrites=true&w=majority&appName=Cluster0` //the account name and password can be found in the atlas, SECURITY -> quickstart -> create a user for the database and save the username and password
                    
                    async function connectDB() {
                        try{
                          await mongoose.connect(url);
                          console.log('You have connected to the database')
                        }
                        catch(error){
                          console.log('error', error.message);
                        }
                    }
                    
                    module.exports = connectDB;

            
                    //3) Next write the following lines of code in ./Model/Model.js

                        const mongoose = require('mongoose');
                        const {Schema} = require('mongoose');
                        
                        const userSchema = new Schema({
                            name: {type: String, required: true},
                            age: {type: Number, required: true}
                        })
                        
                        const User = mongoose.model('user', userSchema, 'name-of-collection')        //create a model that will be used to create documents
                        
                        module.exports = {
                            User
                        }


                    //4) Now you can perform CRUD operations
                            const mongoose = require('mongoose');
                            const {connectDB, ObjectId} = require('./Database/db.js')
                            const {User} = require('./Model/Model.js');
                            const ObjectId = mongoose.Types.ObjectId;                            //new ObjectId('24 character id string goes here');

                            connectDB();

                            app.post('/create_document', async (req, res) => {
                                const body = req.body;
                                const id = new ObjectId(id);
                                
                                try{
                                    const newUserOne = new User({name: 'Johnathan', age: 2223});
                                    const newUserTwo = new User({_id: id});                        //you can create a document with a specified _id
                                    const result = await User.insertMany([{name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}, {name: 'Johnathan', age: 22}]);                                    
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
                    






















