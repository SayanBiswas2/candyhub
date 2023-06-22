let nodemailer = require('nodemailer')
import path from 'path'
import hbs from 'nodemailer-express-handlebars';

export const sendOtpMail = (email,name,otp)=> {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sayanbiswas6073@gmail.com',
        pass: process.env.SMTP_PASS
      }
    });

    var options = {
        viewEngine : {
          partialsDir: path.resolve('./views/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
        extName: '.hbs'
    };

    transporter.use('compile', hbs(options))
    
    let mailOptions = {
      from: 'sayanbiswas6073@gmail.com',
      to: email,
      subject: `Your OTP is ${otp}`,
      // text:`${name} your otp is ${otp}`
      template: 'otp',
      context: {
        otp: otp,
        name:name
      }       
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}


export const sendTokenMail = (email,name,token)=> {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sayanbiswas6073@gmail.com',
      pass: process.env.SMTP_PASS
    }
  });

  var options = {
    viewEngine : {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
    extName: '.hbs'
  };

  transporter.use('compile', hbs(options))


  let mailOptions = {
    from: 'sayanbiswas6073@gmail.com',
    to: email,
    subject: 'Password changing request',
    // text:`${name},Please click hear to change your password ${process.env.NEXT_PUBLIC_API_URL}/auth/changepassword?token=${token}`
    template: 'changePass',
    context: {
      name:name,
      url:`/auth/changepassword?token=${token}`
    }       
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



export const welcomeAdminMail = (email,name,pass,id) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sayanbiswas6073@gmail.com',
      pass: process.env.SMTP_PASS
    }
  });

  var options = {
    viewEngine : {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
    extName: '.hbs'
  };

  transporter.use('compile', hbs(options))

  let mailOptions = {
    from: 'sayanbiswas6073@gmail.com',
    to: email,
    subject: `Welcome to candyhub ${name}`,
    // text:`Welcome ${name}`
    template: 'welcomeAdmin',
    context: {
      name:name,
      pass:pass,
      id:id
    }
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


const welcomeMail = (email,name) =>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sayanbiswas6073@gmail.com',
      pass: process.env.SMTP_PASS
    }
  });
  
  var options = {
    viewEngine : {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
    extName: '.hbs'
  };

  transporter.use('compile', hbs(options))

  let mailOptions = {
    from: 'sayanbiswas6073@gmail.com',
    to: email,
    subject: `Welcome to candyhub ${name}`,
    // text:`Welcome ${name}`
    template: 'welcome',
    context: {
      name:name
    }
  };


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default welcomeMail