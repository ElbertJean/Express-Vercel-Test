const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(express.json());
app.use(cors());


// ************************************
// **************EMAIL*****************
// ************************************
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

// ************************************
// **************CLIENTE***************
// ************************************
app.get('/get-clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('cliente')
    .select('*');

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.get('/get-cliente/:cli_id', async (req, res) => {
  const { cli_id } = req.params;
  const { data, error } = await supabase
    .from('cliente')
    .select('*')
    .eq('cli_id', cli_id);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.post('/post-cliente', async (req, res) => {
  const { cli_id, cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone } = req.body;

  const { data, error } = await supabase
    .from('cliente')
    .insert([{ cli_id, cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone }])
    .select('*');

  if (error) {
    console.error('Erro ao inserir cliente:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.put('/update-cliente/:cli_id', async (req, res) => {
  const { cli_id } = req.params;
  const { cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone } = req.body;
  const { data, error } = await supabase
    .from('cliente')
    .update({ cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone })
    .eq('cli_id', cli_id);

  if (error) {
    console.error('Erro ao atualizar cliente:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

app.delete('/delete-cliente/:cli_id', async (req, res) => {
  const { cli_id } = req.params;
  const { data, error } = await supabase
    .from('cliente')
    .delete()
    .eq('cli_id', cli_id);

  if (error) {
    console.error('Erro ao deletar cliente:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
