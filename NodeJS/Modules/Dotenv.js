//======================================================== ENV VARIABLES ====================================================
/* 
     You can use env variables in your node.js app with this module
*/

const { config } = require('dotenv');
config();                                          //this function must be called before you use your env variables

router.get('/endpoint',  (req, res) => {
    process.env.apiKey;
})
