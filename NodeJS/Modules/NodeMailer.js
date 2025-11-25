//---------------------------------------- NODEMAILER MODULE ----------------------------------------
/* 

	You can use this mail module to send emails from the server 
	
	Keep in mind that you will need crete an app with an app password in Gmail.
 	Use the following link to generate that app password

		https://myaccount.google.com/apppasswords
*/

	var nodemailer = require('nodemailer');
	
	app.put('/send_email', (req, res) => {
		const {email} = req.body;
		
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: process.env.email,
                pass: process.env.app_password
            },
        });
	
		const mailOptions = {
		    from: process.env.email,
		    to: email,
		    subject: 'Reset Link for Note-taking app',
		    text: `Please click on the following link to reset your password ${resetPasswordLink}`    //you can either use html or text here
		}
	
		transporter.sendMail(mailOptions, (error, info) => {
		    if(error){
			res.status(401).send(error.message);
			return;
		    }
		    
		    res.status(200).send('Email sent successfully');
		})
	})
