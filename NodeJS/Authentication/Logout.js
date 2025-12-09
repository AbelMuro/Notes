router.delete('/logout', (req, res) => {
    try{
        res.cookie('accessToken', null);
        res.status(200).send('User has successfully logged out');
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});
