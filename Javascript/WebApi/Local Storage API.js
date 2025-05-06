//============================================================== LOCAL STORAGE =======================================================================
/* 
    The local storage is a storage that lives on the browser. This storage doesn't have an expiration date, and can store
    items indefinitely. All items must be stored in key-value pairs and must be in JSON format
*/




//-------------------------- Storing items
/* 
      You can store items in the storage by using the .setItem() method.
      The item must be in JSON format.
*/

localStorage.setItem("key", JSON.stringify({data: 'value'}))




//-------------------------- Updating items
/* 
     You can update items in the storage by using the .setItem()  and
     .getItem() methods. If an item already exists in the storage, 
     you can replace it with its key and a new value
*/

const item = localStorage.getItem("key");
item = JSON.parse(item);
// update the item somehow here
localStorage.setItem("key", JSON.stringify(item));




//-------------------------- Retrieving items
/* 
     You can retrieve an item from the storage by using the .getItem() 
     method. Items retrieved must be parsed into JS
*/

const item = localStorage.getItem("key");
item = JSON.parse(item);




//-------------------------- Deleting items
/* 
    You can delete an item from the storage by using the .removeItem() 
    method. You need to use the key of the item that you want to delete
*/

localStorage.removeItem("key");












