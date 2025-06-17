//---------------------------------------- NODEMAILER MODULE ----------------------------------------
//you can use this mail module to send emails from the server

	var nodemailer = require('nodemailer');
	
	app.put('/send_email', () => {
		const transporter = nodemailer.createTransport({			//nodemailer is a module we can use to send an email to the user
		    service: 'Gmail',
		    auth: {
			user: process.env.email,
			pass: process.env.app_password                          	//you must create an app password for an app in your gmail acount
		    }
		})
	
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
