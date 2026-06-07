/* 
                                EVENT LOOP
                                
    			 Node.js uses the event loop to process and handle tasks, even though javascript is single-threaded, we use the
    			 event loop to simultaneously perform multiple tasks. All synchronous tasks are placed in the call-stack,
		  	   and executed one by one. All asynchronous tasks are taken out of the call-stack and processed in a different 
		    	 thread (this thread is NOT part of javascript). Once the asynchronous task has completed in the 
		       separate thread, it will then be placed in the Queue. Once the call-stack is empty, all tasks in the 
			     queue then get placed in the call-stack for execution in the main node.js thread. Keep in mind that the queue
    			 divides its tasks into microtasks and macrotasks; microtasks(promises) have a higher priority, and macrotasks(setTimeout) 
			     have a lower priority

				   JAVASCRIPT THREAD			                  SEPARATE THREAD											 	
			 	
				     Call stack												  	  
			  	 |		        |										
				   |		        |												
				   |  syncFunc	|											
				   |  AsyncFunc	| --------------> this async function is taken out of the call stack 	
				   |  syncFunc	|		              and processed in a separate thread. Once the function				
				   |  syncFunc	|                 finishes processing, it gets placed in the Queue				
				   |  syncFunc	|				                            |								
				   -------------				                            |								
					      ^					                                  |
					      | 					                                |	
				       Queue					                              |
				   |		        |				                            |
				   |		        |	           <----------------------|
				   |		        |
				   |		        |
				   |		        |
				   | AsyncFunc  |		      The Queue will complete all microtasks before completing macrotasks
				    ----------	


*/
