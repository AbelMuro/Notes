
// --------------------------------------------------- FORGOT PASSWORD ------------------------------------------------
/* 
	If the user has forgotten their password, we can create a reset token they can use to reset their password
 	The reset token must be stored in their account in the database, it will also have an expiration date.
  We can use the crypto module to create the reset token.

  The process will go like this.. we create the reset token and store it in the user's account in database.
  We then send the user an email with the reset link. The reset link will take them to another page in 
  the application where they can reset their password

  Look at the nodemailer module of your Node.js notes for more info on sending emails
*/

const crypto = require('crypto');

app.put('/forgot_password', async (req, res) => {
	const resetToken = crypto.randomBytes(32).toString('hex');
	const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');		//we create the reset token
	const resetPasswordExpires = Date.now() + 10 * 60 * 1000;						//we set the expiration date for the token

	updateAccountDataInDatabase(resetPasswordToken, resetPasswordExpires);

	const resetPasswordLink = `http://localhost:3000/reset/${resetToken}`

	sendEmailToUserWithResetLink(resetPasswordLink);							//use nodemailer to send emails (go to node.js )

	res.status(200).send('Email sent successfully');
})






// --------------------------------------------------- RESET PASSWORD ------------------------------------------------
/* 
	Once the email has been sent to the user, the page in the application should be able to get the 
 	reset token from the URL and send it to the back-end
*/

app.put('/reset_password', (req, res) => {
	const {token, newPassword} = req.body;

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	const accountData = findUserAccountInDatabase({resetPasswordToken: hashedToken})	//we look for an account that has the value hashedToken and property resetPasswordToken
	const resetPasswordExpires = accountData.resetPasswordExpires;

	if(resetPasswordExpires < Data.now()){
		res.status(401).send('Token has expired');
		return;
	}
	
	accountData.password = newPassword;
	accountData.resetPasswordToken = null;
	accountData.resetPasswordExpires = null;

	updateUserAccountDataInDatabase(accountData)

	res.status(200).send('Password changed successfully')
	
})
