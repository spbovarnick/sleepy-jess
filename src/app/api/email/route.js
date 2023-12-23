import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST( request ) {
  const { email, name, message, subject } = await request.json(); 

  const transport = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    },
  })

  let mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    cc: email,
    subject: `${subject ? `${subject} --` : 'Message from'} ${name} (${email})`,
    text: message,
  }

  const sendMailPromise = () => {
    return new Promise((resolve, reject) => { 
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent!')
        } else {
          reject(err.message)
        }
      })
    })
  }
  
  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent!' })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500})
  }
}