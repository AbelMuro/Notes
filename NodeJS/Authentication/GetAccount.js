// --------------------------------------------------- GET ACCOUNT ------------------------------------------------
/* 
	  We can access account data using JSON web tokens and HTTP-only cookies
*/


app.get('/account', async (req, res) => {
     const JWT_SECRET = 'my secret key goes here'; 
     const token = req.cookies.accessToken;

     if(!token)
        return res.status(403).send('Please enable third-party cookies and enable cross-site tracking in the browser')
         

     const decoded = jwt.verify(token, JWT_SECRET);
     const email = decoded.email;

     const accountData = getAccountDataFromDatabase(email);

     res.status(200).json(accountData)
})
