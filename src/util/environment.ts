import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

// DBConfig
const pgHost = process.env.PG_HOST || 'localhost';
const pgPort = parseInt(process.env.PG_PORT || '5432');
const pgUser = process.env.PG_USER || 'postgres';
const pgPassword = process.env.PG_PASSWORD || 'password';
const pgDatabase = process.env.PG_DATABASE || 'postgres';

// Invertexto API
const invertextoApiToken = process.env.INVERTEXTO_API_TOKEN;

console.log({
  pgHost,
  pgPort,
  pgUser,
  pgPassword,
  pgDatabase,
  invertextoApiToken
});

if (!invertextoApiToken) {
  console.warn('[WARN] Não foi possível encontrar a variável de ambiente "invertextoApiToken".');
  console.warn('[WARN] O provedor Invertexto não funcionará sem um token especificado no .env.production, pois se trata de uma API privada que requer uma conta.');
}

if (!pgHost || !pgUser || !pgPassword || !pgDatabase) {
  console.warn('[WARN] Não foi possível encontrar uma ou mais variáveis de ambiente do banco de dados PostgreSQL.');
  console.warn('[WARN] A aplicação executará sem um banco de dados PostgreSQL normalmente, porém não fará os registros das requisições. Para configurar o banco de dados localmente, ver o arquivo .env.example.');
}

export {
  pgHost,
  pgPort,
  pgUser,
  pgPassword,
  pgDatabase,
  invertextoApiToken
};
