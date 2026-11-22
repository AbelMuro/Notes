//------- cookie-parser
/* 
	you need to install cookie-parser and use it on your index.js
*/
const cookieParser = require('cookie-parser');                //npm install cookie-parser, this will parse all cookies
app.use(cookieParser())


router.delete('/logout', (req, res) => {
    try{
        res.clearCookie('accessToken');
        res.status(200).send('User has successfully logged out');
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});
