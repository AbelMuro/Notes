/* 
                                  PROMISES
                                  
		    	A promise is an object that tells us when an asynchronous operation has been completed, or if something went wrong in the operation. 
       		The promise will have one of three states; pending, fulfilled or rejected. Promises are the modern way of handling asynchronous operations. 
	  		  Before the invention of promises, asynchronous operations were handled by callbacks. But it was easy to fall into the callback hell 
     			(unmanagable mess of code). Promises solve the problem of the callback hell. In javascript, we use the Promise constructor to 
			    create a promise object. These promise objects have .then() and catch() methods that each handle the fulfilled and rejected 
   			  states of the promise. Keep in mind, that the promise constructor is synchronous, but the callback argument is asynchronous.

*/

					const promise = new Promise((resolve, reject) => {
     						const success = true;
    						if(success)
     						    resolve('success');
	    					else
	   					      reject('rejected');
					})
     			promise
	  				  .then((result) => {			//will be called if promise resolves	
	  				       console.log(result);
					    })
     				  .catch((error) => {			//will be called if promise rejects
	  					    console.log(error);
					    })
