import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

const invertextoApiToken = process.env.INVERTEXTO_API_TOKEN;

const pgHost = process.env.POSTGRES_HOST;
const pgUser = process.env.POSTGRES_USER;
const pgPassword = process.env.POSTGRES_PASSWORD;
const pgDatabase = process.env.POSTGRES_DATABASE;

console.log({
  invertextoApiToken,
  pgHost,
  pgUser,
  pgPassword,
  pgDatabase
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
  invertextoApiToken,
  pgHost,
  pgUser,
  pgPassword,
  pgDatabase
};
