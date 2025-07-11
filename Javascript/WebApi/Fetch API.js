
//============================================================== FETCH API ============================================================== 
// API : application programming interface, its a very broad term...
// Alot of the times, you will fetch data from a RESTFULL API... 
// REST APIs follow a pattern that specifies how the information will be transmitted from one computer to another. 
// The computer asking for the data is called the client, and the computer sending the data back is known as a server. 
// This dance is called the request-response cycle.

// The fetch API can be used to make requests to servers
// by default, fetch will do a 'GET' request

// Keep in mind that when you make a 'same-origin' request to a server, the browser will always allow it.
// However, when you make a 'cross-origin' request to a third-party server, the browser will only allow it..
// ..IF the third-party server sends a pre-flight response with the header 'access-allow-control-origin' that has
// your origin/url as one of the values			
			
			
//If you ever get the following error when making an API request with Fetch
//  No 'Access-Control-Allow-Origin' header is present on the requested resource. 
//  If an opaque response serves your needs, set the request's mode to 'no-cors' to 
//  fetch the resource with CORS disabled.
//then it usually means that the server doesn't want client side programs to access the API
			
// Printfull API, 
// you must first have registered an access token with printfull that has a specific URL/origin to your app.
// printfull will then add your URL/origin to the 'access-allow-control-origin' and any request made from your
// URL/origin will be allowed




//--------------------------Second parameter documentation for fetch api
fetch("/somePath", {
    method: 'POST', 									// *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify({name: 'carlos', age: 30}), 					// body data type must match "Content-Type" header	
    mode: 'cors', 									// no-cors, *cors, same-origin
    cache: 'no-cache', 									// *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',								// include, *same-origin, omit     (used for including credentials such as cookies)
    headers: {
      'Content-Type': 'application/json' 						//data will be formatted into json...... another option is multipart/form-data, thhis is necessary for file uploads
      'apikey' : 'YOUR_API_KEY'							 	//if api keys are not included in the URL, then it should be included here
    },
    destination: 'data',								//some api's may require that you put custom properties like this
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    keepalive: true		//this property was designed to be used in a fetch request within a unload event, the browser will not wait to the fetch request to complete before unloading. but using this property will keep the fetch request alive
})




//------------------------ Fetch API with async and await
const response = await fetch('https://myWebsite.com/somePath', {                                                    //this will will return a promise..... 
      method: "POST",                                                   //POST, GET, PUT, DELETE
      credentials: "include",                                           //used for including credentials such as cookies
      headers: {                                                        //defines the data that will be sent to the server
          "Content-Type" : "application/json"                           //data will be formatted into json, you can also use 'application/x-www-form-urlencoded'
      },      
      body: JSON.stringify({data: "data"}),                            //this is the actual data that we are sending with the post request(it must be in JSON)
})

if(response.status === 200){
  const result = await response.text() // or response.json()            text() will parse the data into text, json() will be parse the json data into javascript      
  //result will contain the data from the server
}



//------------------------ Fetch API with promises
const promise = fetch('URL', {
    method: 'GET',
    headers: {
	'Content-Type': 'application/json'
    },
});
promise
    .then(response => response.json())
    .then(results => {console.log(results)}))
    .catch(error => console.log(error.message));






//----------------------------------Using the fetch api to send files to a server
/* 
	When we get a file from a form and store in FormData(), the file is stored as a Blob(binary large object) and then send to the back end
*/

const email = e.target.elements.email.value;
const username = e.target.elements.username.value;
const password = e.target.element.password.value;   
const image = e.target.elements.image.files[0];          //remember that the 'files' property is an array   


const formData = new FormData();
formData.append('email', email);
formData.append('password', password);
formData.append('username', username);
formData.append('image', image);		      //this is stored as a Blob object

fetch('https://myWebsite.com/somePath', {
      method: "POST",                                //you dont need to include the headers property here
      body: formData;				     //look at your node.js notes on how to receive files from the front-end
})






//------------------------------------Using the fetch api to receive files from server
/* 
	1) we get file as a base64 encoded string from the server

 	2) We decode base64 string into a binary string (each character in the string represents a byte in binary data), 
  		keep in mind that the string is NOT raw binary data, but just a representation of it

    	3) We create an array of Uint8Array() that will be used to store the unicode value of each character in the binary string
     	       we use unicode because the unicode value can be decoded into raw binary data

        4) We use the Blob constructor to actually create an object that has the raw binary data

 	5) With the blob object, we can create a URL from it and use it in our application through the src attribute in img tags

  	(Unicode is a numerical system that gives a unique identifier for every letter, number or symbol; these identifiers can be used to decode raw binary data)

*/

const response = await fetch('http://localhost:4000/get_account', {
	method: 'GET',
	credentials: 'include'
})
	
const account = await response.json();
const username = account.username;
const contentType = account.contentType;
const image = account.image;

const binaryString = atob(image);                             //decode base64 into binary string (each character represents a byte in binary data)
const byteArray = new Uint8Array(binaryString.length);        //we create an array of 8-bit(1 byte) unsigned integers, this array will be used to store the unicode value of each character in the binary string
for(let i = 0; i < binaryString.length; i++){
   byteArray[i] = binaryString.charCodeAt(i)		     //we get the unicode value of each binary character and store it in the array
}							    

const blob = new Blob([byteArray], {type: contentType});     //we create a Blob (Binary Large Object) that represents binary raw data for the file
const imageUrl = URL.createObjectURL(blob));		     //we create a url from the Blob, and use it for the src attribute of img tags
	
	<img src={imageUrl}/>




//------------------------------------------






		
