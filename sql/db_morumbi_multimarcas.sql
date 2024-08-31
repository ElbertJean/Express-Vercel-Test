CREATE DATABASE db_morumbi_multimarcas;

CREATE TABLE cliente (
  cli_id SERIAL PRIMARY KEY,
  cli_nome VARCHAR(100),
  cli_rg VARCHAR(9),
  cli_cpf VARCHAR(11),
  cli_email VARCHAR(100),
  cli_telefone VARCHAR(20),
  cli_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE endereco (
  end_id SERIAL PRIMARY KEY INCREMENT,
  end_cep VARCHAR(8),
  end_logradouro VARCHAR(100),
  end_bairro VARCHAR(100),
  end_cidade VARCHAR(100),
  end_uf VARCHAR(2),
  end_complemento VARCHAR(100),
  end_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cli_id INTEGER,
  FOREIGN KEY(cli_id) REFERENCES cliente(cli_id) 
);

CREATE TABLE carro_estoque (
  carE_id serial PRIMARY KEY,
  carE_marca VARCHAR,
  carE_modelo VARCHAR,
  carE_ano int,
  carE_renavam VARCHAR UNIQUE,
  carE_cor VARCHAR
);

CREATE TABLE carro_cliente (
  carC_id serial PRIMARY KEY,
  carC_marca VARCHAR,
  carC_modelo VARCHAR,
  carC_ano int,
  carC_renavam VARCHAR UNIQUE,
  carC_cor VARCHAR
);

CREATE TABLE cliente_carroEstoque (
  cliE_id serial PRIMARY KEY,
  cliE_cli_id INTEGER,
  cliE_carE_id INTEGER,
  FOREIGN KEY(cliE_cli_id) REFERENCES cliente(cli_id),
  FOREIGN KEY(cliE_carE_id) REFERENCES carro_estoque(carE_id)
);

CREATE TABLE cliente_carroCliente (
  cliC_id serial PRIMARY KEY,
  cliC_cli_id INTEGER,
  cliC_carC_id INTEGER,
  FOREIGN KEY(cliC_cli_id) REFERENCES cliente(cli_id),
  FOREIGN KEY(cliC_carC_id) REFERENCES carro_cliente(carC_id)
);

