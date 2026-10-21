const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: { 
        rejectUnauthorized: false 
    }
});

module.exports = async function enviarEmail(dados, corpo, pdf) {    
    const attachments = [
        {
            filename: dados.nomeArquivo,
            content: pdf
        }
    ];

    if(dados.logoCorpoEmail){
        attachments.push({
            filename: 'logo.png',
            path: path.join(__dirname, '../uploads/logo.png'),
            cid: 'logo_empresa'
        })
    }

    await transporter.sendMail({
        from: dados.correspondente,
        to: dados.destinatarios,
        subject: dados.assunto,
        bcc: dados.copia,        
        replyTo: dados.responderPara,
        html: corpo,
        attachments: attachments
    });
};