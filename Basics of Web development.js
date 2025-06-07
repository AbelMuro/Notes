/* 

						TERMINOLOGY OF WEB DEVELOPMENT


                                FRONT-END-DEVELOPMENT: development of the visual aspect of a website/app
                                
                                BACK-END-DEVELOPMENT: development of server-side logic and databases

                                API: application programming interface. They are interfaces that enable interaction between two software applications.
                                     this interface must be used if one software app wants to request resources from another software app

                                RESTfull API: Representational State Transfer API, They are interfaces that enable interaction between a Client (website) and a server through HTTP methods (GET, POST, DELETE, etc...)
                                              These API's must follow the following rules to be considered a RESTfull

                                              1) Stateless: the API cannot store any session data from the client
                                              2) HTTP Methods: the API must use HTTP methods (GET, POST, etc...)
                                              3) JSON Responses: the API must send responses containing data in JSON
                                              4) Endpoints: the API must have URL endpoints that represent resources (/username/settings)
                                              5) Client-Server Separation: The front-end and back-end operate independently, communicating via HTTP method requests.                                  
                                
                                SERVER: a computer that provides resources to other computers
                                        WEB-SERVER: a server that provides files of a website/app to other computers (netlify, vercel, etc...)
                                        APPLICATION-SERVER: a server that runs instructions and processes requests from other computers and sends responses (Node.js) 
                                        DATABASE-SERVER: a server that manages and stores data (SQL, noSQL)

                                BROWSER:
                                          1) When you first type-in the URL of a website (www.google.com), the browser will check the DNS(Domain Name System) of the URL.
                                             The browser will use the DNS to translate the human-readable URL into the corresponding IP address of the server that is hosting the website 

                                          2) Once the browser knows the IP address of the server, it will make a request to that server, asking for all the resources of the website (HTML files, css files, JS files)

                                          3) The server will process the request and decide what content to send to the browser
	                                              If the server uses server-side rendering, then the server will generate the website in the server first before sending a response
	                                              If the server uses client-side rendering, then the server will first send the HTML files to the browser, then the JS files
			
			                  4) Once the server receives the html, css, and JS files, the browser will start building an HTML-only DOM tree
		       			     
			                  5) Then the browser will build a CSS-only DOM tree.
			
			                  6) The browser will combine these two trees to form the Render DOM tree. This is what actually gets displayed on the screen.
			              
			                  7) The browser will calculate precise positions and sizes of the elements in the Render tree, this process is called layout calculation (reflow)

  					  8) The browser will paint the elements on the screen.

					  9) The browser may create separate layers for different elements, this process is called Compositing. The render tree will start with a 
       					     default layer where all elements are initially placed. If an element has 'position: absolute' or 'transform: translate()', then it will 
		 			     have its own layer in the render tree. 

      					  10) When the HTML elements are updated, removed, or added, this will cause a change in the HTML-only dom tree, which in turn will trigger a re-render in the Render tree
	     				      When certain css properties (width, height, margin, padding,...) are changed, this will cause a REFLOW for the CSS-only dom tree, which in turn will trigger a re-render in the Render tree
	     
    
*/
							










       
//======================================================= HTTP ===========================================================================     
// HTTP stands for hyper text transfer protocol, it's a protocol that describes how a web browser and a web server communicates with each other.
// The web browser will send a request to the web server and will wait for a response from the web server.
/* HTTP VERBS: are methods that we use to interact with the web server and database
	      GET method
	      POST method
	      DELETE method
	      PUT method




















//======================================================= CORS ===========================================================================    
/* 
	 CORS (Cross Origin Resource Sharing)	is a 'HTTP-header based mechanism' that allows a server to specify which domains/scheme/port are ALLOWED 
         to get resources from the server. CORS relies on a mechanism called Pre-flight requests and responses. The browser will send a pre-flight request
	 to the server (The pre-flight request will contain the HTTP method and the domain of the client). The server will receive the pre-flight request 
         and check if the domain of the client is allowed to make requests to the server and if the client is allowed to use the HTTP method. 
	 Then the server will send a pre-flight response to the client, notifying them if they are allowed to make fetch requests to the server
*/
   
	       
/* 
	Pre-flight request		
		OPTIONS /resource/foo
		Access-Control-Request-Method: DELETE					<-------------
		Access-Control-Request-Headers: origin, x-requested-with
		Origin: https://foo.bar.org

	Pre-flight response
		HTTP/1.1 204 No Content
		Connection: keep-alive
		Access-Control-Allow-Origin: https://foo.bar.org
		Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE		<-------------
		Access-Control-Max-Age: 86400
		
	Since the pre-flight response contains the delete method in one of the headers,
	then that means the client can send delete requests to the server

*/
















// ==================================================== BASE (RADIX) ==========================================================================

/* 
	A base is a numerical system that uses symbols to represent numbers, the base that everyone is used to is base 10 (1, 2, 3, 4, ..... infinity);

 	Base 36
  		
		0
	 	1
	  	2
	   	3
	    	4
	     	5
	        6
	        7
	      	8
	        9
	        A		represents 10
	        B		represents 11
	        C		represents 12
		D		represents 13




	There are two functions that you can use to utilize these bases (the second argument has to be the same symbol that is used in the base)

  	const base36A = parseInt('a', 36)		//we get the number that is represented by 'a' in BASE 36, and that is 10
   	const letter = (13).toString(36)		//we get the number that is represents by '13' in BASE 36, and that is D

    

    	The only time that i ever used these bases was in leetcode to convert letters to numbers and vice versa
     	What you can do is create a mapping like this.. 

      		a -> 1
		b -> 2
  		c -> 3
        	..

  	you can use parseInt() and toString() to convert a to 1 and vice versa

	parseInt('a', 36) - 9							//this will convert 'a' into 1, this is useful for finding the location of a letter in the alphabet  a -> 1  b -> 2   c -> 3 ....  y -> 25  z -> 26
	
	const index = 2
	const letter = (index + 9).toString(36)					//this will convert 2 into 'b', this is usefull for getting letters in the alphabet based on their position   1 -> a   b -> 2   3 -> c  ....  25 -> y   26 -> z

 
*/














                                          4) The server will then send a response to the browser, containing all the files necessary for the website

                                          5) The browser interprets the HTML, applies CSS for styling, executes JavaScript for interactivity, and starts displaying content on your screen.
