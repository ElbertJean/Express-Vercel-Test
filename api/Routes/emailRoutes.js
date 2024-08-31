const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { nome, telefone, email, cpf, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SPRING_MAIL_HOST,
    port: Number(process.env.SPRING_MAIL_PORT),
    secure: true,
    auth: {
      user: process.env.SPRING_MAIL_USERNAME,
      pass: process.env.SPRING_MAIL_PASSWORD,
    },
  });

  const mailOptionsClient = {
    from: process.env.SPRING_MAIL_USERNAME,
    to: email,
    subject: `Olá ${nome}!`,
    text: `Obrigado por entrar em contato conosco! Em breve, retornaremos.`,
  };

  const mailOptionsAdmin = {
    from: process.env.SPRING_MAIL_USERNAME,
    to: 'elbertjean@zohomail.com',
    subject: `Novo contato de: ${nome}`,
    text: `Nome: ${nome}\nTelefone: ${telefone}\nCPF: ${cpf}\nEmail: ${email}\nMensagem: ${mensagem}`,
  };

  try {
    await transporter.sendMail(mailOptionsClient);
    await transporter.sendMail(mailOptionsAdmin);
    res.status(200).json({ message: 'Emails enviados com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error.message);
    res.status(500).json({ error: 'Erro ao enviar email.' });
  }
});

module.exports = router;