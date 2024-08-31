import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { supabase } from './subapaseClient';

const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
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

app.post('/cliente', async (req, res) => {
  const { nome, rg, cpf, email, telefone, endereco_id } = req.body;

  const { data, error } = await supabase
    .from('clientes')
    .insert([{ nome, rg, cpf, email, telefone, endereco_id }]);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.get('/clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*');

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
