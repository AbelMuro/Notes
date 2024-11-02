/* 
    MongoDB is a NoSQL database that uses collections. 
    A collection is a group of documents. 
    A document is similar to a javascript object where it organizes the data with key-value pairs.
      A key is typically a string and the value is some primitive or non-primitive value
      Below is an example of a document/object in mongoDB

          {
             _id: ObjectId(7df78ad8902c)                      //every document has an id property that ensures the uniqueness of the document, if you dont provide an _id property, mongo will do it for you
             title: 'MongoDB Overview', 
             description: 'MongoDB is no sql database',
             by: 'tutorials point',
             url: 'http://www.tutorialspoint.com',
             tags: ['mongodb', 'database', 'NoSQL'],
             likes: 100, 
             comments: [	
                {
                   user:'user1',
                   message: 'My first comment',
                   dateCreated: new Date(2011,1,20,2,15),
                   like: 0 
                },
                {
                   user:'user2',
                   message: 'My second comments',
                   dateCreated: new Date(2011,1,25,7,45),
                   like: 5
                }
           ]
        }
    

*/
