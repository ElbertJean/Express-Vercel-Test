const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.get('/get-clientes', async (req, res) => {
  const { data, error } = await supabase
    .from('cliente')
    .select('*');

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

router.get('/get-cliente/:cli_id', async (req, res) => {
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

router.post('/post-cliente', async (req, res) => {
  const { cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone } = req.body;

  const { data, error } = await supabase
    .from('cliente')
    .insert([{ cli_nome, cli_rg, cli_cpf, cli_email, cli_telefone }])
    .select('*');

  if (error) {
    console.error('Erro ao inserir cliente:', error.message);
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});

router.put('/update-cliente/:cli_id', async (req, res) => {
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

router.delete('/delete-cliente/:cli_id', async (req, res) => {
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

module.exports = router;
