import { createTransport } from "nodemailer"

export const sendMail = async (data, subject, email) => {

    try {
        const transport = createTransport({
            service: "gmail",
            host: "smpt.gmail.com",
            port: 465,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            }
        })
        const html = `
            <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: red;
            }
            p {
                margin-bottom: 20px;
                color: #666;
            }
            .otp {
                font-size: 36px;
                color: #7b68ee; /* Purple text */
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Hello ${data.user.name} your (One-Time Password) for your account verification is.</p>
            <p class="otp">${data.otp}</p> 
        </div>
    </body>
    </html>`

        await transport.sendMail({
            from: process.env.GMAIL,
            to: email,
            subject: subject,
            html,
        })
    } catch (error) {
        console.log("Error in sending email", error);
        return res.status(400).json({
            error: error.message
        })
    }
}