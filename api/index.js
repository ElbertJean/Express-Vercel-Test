const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const emailRoutes = require('./Routes/emailRoutes');
const clienteRoutes = require('./Routes/clienteRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(emailRoutes);
app.use(clienteRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
