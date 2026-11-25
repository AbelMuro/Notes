/*
									LIBUV
									
				Libuv is a built-in library in Node.js that handles asynchronous I/O operations  
				(I/O is where Node.js has to communicate with anything outside the servers memory/cpu)
				such as reading files, networking, DNS lookups and thread-pool management.
				By default, Libuv uses 4 threads for the following operations...

						fs.readFile()      				// disk I/O
						fetch()            				// network I/O
						http.createServer()				// network I/O
						dns.lookup()       				// DNS I/O

				Libuv has its own event loop that is used outside the scope of the thread
				of javascript. Libuv can also handle other asynchronous non-I/O operations 
				such as...

						setTimeout()
						crypto.pbkdf2(...)
						zlib.gzip(...)

*/
