/* 
    MongoDB is a NoSQL database that uses collections. 
    A collection is a group of documents. 
    A document is similar to a javascript object where it organizes the data with key-value pairs.
      A key is typically a string and the value is some primitive or non-primitive value
      Below is an example of a document/object in mongoDB

          {
             _id: ObjectId(7df78ad8902c)                      //every document has an id property that ensures the uniqueness of the document, if you dont provide an _id property, mongo will do it for you
             title: 'MongoDB Overview', 
             tags: ['mongodb', 'database', 'NoSQL'],
             likes: 100, 
        }
*/


//============================================================ HOW TO INTEGRATE MONGODB INTO A NODE.JS APP ========================================================================


                    //1) npm install mongodb

                    //2) Use the following lines of code
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
                                
                                module.exports = {connectDB};


                        //3) Perform CRUD operations with the db object
                                //insertOne() will insert a single document in the collection
                                //insertMany() will insert multiple documents in the collection
                                //find() will return a cursor that has a single or multiple documents that satisfy the query
                                    // toArray() will return an array with all the documents
                                    // next() will return an object with the first document that satisfies the query


                            const {connectDB} = require('./Database/db.js');
                            const { ObjectId } = require('mongodb'
                    
                                app.post('/register', async (req, res) => {
                                    const body = req.body;
                                    
                                    try{
                                        const db = await connectDB();
                                        const resultOne = await db.collection('users').insertOne({ name: "Jane", age: 25 });            //insertOne() will insert a new document in the collection
                                        const resultTwo = await db.collection('users').insertMany(([{ name: "Jane", age: 25 }, { name: "Doe", age: 22 )
                                        console.log(resultOne, resultTwo);
                                        res.status(200).send('Successfully added user to database');        
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                                })


                                app.get('/account', async (req, res) => {      
                                    const id = new ObjectId('any id goes here');
                                    
                                    try{
                                        const db = await connectDB();
                                        const allUsers = await db.collection('users').find({}).toArray();            //find({}) will find all documents within the collection
                                        const user = await db.collection('users').find({name: "John"}).next();       //this will find a document with the property name and value 'John' 
                                        const anotherUser = await db.collection('users').find({_id: id}).next();     //to find a document with an id, you will need to use the ObjectId constructor
                                        
                                        res.status(200).send('Successfully added user to database');        
                                    }
                                    catch(error){
                                        console.log(error);
                                    }
                                })





