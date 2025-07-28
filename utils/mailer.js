import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import transporter from '../config/transporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sendEmail = async ({ email, subject, template, context }) => {
    const templatePath = path.join(__dirname, '../views/emails', template);

    const html = await ejs.renderFile(templatePath, context);
    
    // ejs.renderFile(): This function is provided by the EJS library. It reads an EJS template file and renders it into HTML using the provided context data.

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;