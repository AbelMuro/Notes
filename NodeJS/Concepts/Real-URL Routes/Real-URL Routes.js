//================================================ REAL-URL ROUTES ================================================
/* 
	You can create a route that serves an image to the front end that uses an img tag

	KEEP IN MIND, this method will not work in a serverless environment (AWS lambda, Netlify functions, etc...)
*/

//------------------- Back end

router.get('/image', async (req, res) => {
    try{
		const account = getAccountFromDatabase();

        const imageData = account.imageData;
        const mimeType = imageData.mime_type;
        const data = imageData.data;				//this will be the buffer property from the req.file object

        res.set('Content-Type', mimeType);
        res.send(data)  
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});


//------------------- Front end

/*
	You can directly call the real-url route via the src attribute of a img tag
*/
<img src="http://localhost:4000/get_image"/>


	
/* 
	You can also make a fetch request to the real-url route 

	(using the cache parameter will ensure that the browser doesnt rely on
	the cache to display the image, this is particularly useful when the
	user updates their photo in their account)
*/

const getImage = async () => {
	const response = await fetch(`http://localhost:4000/get_image?cache=${Date.now()}`, {method: 'GET'});
	const imageData = await response.blob();
	const imageSrc = URL.createObjectURL(imageData);	//you can assign the imageSrc variable to an img tag via the src attribute
} 


