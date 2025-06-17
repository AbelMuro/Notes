//---------------------------------------- URL MODULE ----------------------------------------
/* 
	The url module can be used to manipulate and extract specific parts of the current url.
 	Url stands for Uniform Resource Locator, and it is used as the address for every website. 
  	You can get the current url with 'req.url'	
*/

const url = require('url');                                       // used for formating the url of the website

app.post('/url', (req, res) => {
	const full_url = req.url;				// http://example.com/aboutus/contantus?year=2017&month=february
	const parsed_url = url.parse(full_url, true);		// parsing the url string into an object (if second argument is true, url will be parsed into object, if its false, then it will be parsed into a string )
  const host = parsed_url.host;				// returns the domain name (example.com)
	const pathname = parsed_url.pathname;			// returns the path (/aboutus/contantus)
	const search = parsed_url.search;			// returns the query parameters as a string (?year=2017&month=february)
	const query = parsed_url.query;				// returns the query parameters as an object { year: 2017, month: february}
})
