// server/services/email.service.js

import path from 'path';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

// console.log(process.env.EMAIL)
// console.log(process.env.EMAIL_APP_CODE)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_CODE
    }
});
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('public/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('public/views/'),
};
transporter.use('compile', hbs(handlebarOptions))

/**
 * @param {Object} options mail options,
 * which includes "from", "to",
 * "subject" and "text" fields.
 *
 * @throws error
 * @returns message about error or success
 */
async function sendEmail(options) {
    return await transporter.sendMail(options, (error, info) => {
        if (error) {
            throw error;
        } else {
            return ` ${__filename} | Email send: ${info.response}`;
        }
    });
}

/**
 * Creates confirmation code in database and sends it to email.
 * @param {String} email email address
 * @param {String} code confirmation code
 *
 * @throws error
 * @returns message about error or success
 */
async function sendConfirmation(email, link) {
    const mailOptions = {
        template: 'confirmation',
        context: {
            link
        },

        from: 'Usof Team',
        to: email,
        subject: 'Confirm your email'
    };
    return await sendEmail(mailOptions);
}
async function sendConfirmationPayment(email, pdfPath) {
    const mailOptions = {
        template: 'ticket',
        from: 'Usof Team',
        to: email,
        subject: 'Ticket',
        attachments: [{ filename: 'ticket.pdf', path: pdfPath }]
    };
    return await sendEmail(mailOptions);
}

/**
 * Sends congratulation when user finishes registration.
 * @param {String} email email address
 * @param {String} name name of recepient
 *
 * @throws error
 * @returns message about error or success
 */
async function sendCongratulations(email, name) {
    const mailOptions = {
        template: 'congratulations',
        context: {
            name
        },

        from: 'Usof Team',
        to: email,
        subject: 'Congratulations'
    };
    return await sendEmail(mailOptions);
}

/**
 * Sends letter with link for reset password.
 * @param {String} email email address
 * @param {String} link reset link
 *
 * @throws error
 * @returns message about error or success
 */
async function sendReset(email, link) {
    const mailOptions = {
        template: 'reset',
        context: {
            link
        },

        from: 'Usof Team',
        to: email,
        subject: 'Reset Password'
    };
    return await sendEmail(mailOptions);
}

export default {
    sendEmail,
    sendConfirmation,
    sendCongratulations,
    sendReset,
    sendConfirmationPayment
}
