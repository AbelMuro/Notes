//============================================================== SESSION ==============================================================================
/* 
    The Session storage is a storage that lives on the browser. The data is stored with keys and values, and will expire 
    when the user closes the browser tab or the browser. To store and retrieve data in the session storage, 
    you must use JSON.stringify and JSON.parse methods.

    Session storage has a capacity of 5 m

    sessionStorage.clickcount = 1;                             //a property that you can use to keep track of the number of clicks of the user
*/





//---------------------- Storing items
/* 
    You can store data in key-value pairs in storage by using the 
    .setItem() method. The value must be in JSON format
*/

sessionStorage.setItem("key" , JSON.stringify({data: 'value'}));







//---------------------- Updating items
/* 
    You can update items in the storage by using the .setItem() and
    .getItem() method. If you use the key of an existing item, you can replace
    the item with a new value.
*/

let item = sessionStorage.getItem("key");
item = JSON.parse(item);
// update the item somehow here
sessionStorage.setItem("key", item)






//---------------------- Retrieving items
/* 
    You can retrieve items in storage by using the .getItem()
    method. You can do this by using the key of the item you 
    want to retrieve. Keep in mind, that the item you retrieve
    from the session storage will be in JSON format, so you need 
    to convert it into JS with JSON.parse()
*/
let item = sessionStorage.getItem("key");                            
item = JSON.parse(item); 








//---------------------- Deleting items
/* 
  You can delete items in storage by using the .removeItem() and 
  .clear() methods. You can do this by using the key of the item 
  that you want to delete.
*/
sessionStorage.removeItem("key");
sessionStorage.clear();                                    // deletes all items in the storage
