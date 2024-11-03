import { routers } from './routes/index';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

/** Cabeçalhos (configuração do CORS) */
app.use((request: Request, response: Response, next: NextFunction) => {
  // Origens que serão permitidas a conexão
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Métodos da requisição que serão permitidos
  response.setHeader('Access-Control-Allow-Methods', 'GET');

  // Cabeçalhos da requisição que serão permitidos
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Se a API utiliza ou não credenciais
  response.setHeader('Access-Control-Allow-Credentials', 'false');

  // Passa para a próxima camada do middleware
  next();
});

/** Página raiz */
app.get('/', (request: Request, response: Response) => {
  const ip = request.socket.remoteAddress;
  const status = response.statusCode;

  response.status(200).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Desenvolvimento de uma API REST utilizando os princípios SOLID</title>
    </head>

    <body>
      <h1>Desenvolvimento de uma API REST utilizando os princípios SOLID</h1>
      <p>O servidor da API está em execução e retornou o status <b><span style="color: green;">${status}</span></b>.</p>
      <p>O seu IP é: <b>${ip}</b></p>
    </body>
    </html>
  `);
});

/** Rotas */
app.use(routers);

/** URL não foi encontrado */
app.all('*', (request: Request, response: Response) => {
  response.status(404).send({ mensagem: 'O URL solicitado não foi encontrado neste servidor.' });
});

/** Tratamento de erros */
app.use((error: any, request: Request, response: Response, next: NextFunction) => {
  console.error(error);

  const message = error.message || '';
  const object = error.object || undefined;
  const statusCode = error.statusCode || 500;
  const canSendMessage = error.canSendMessage || false;

  const messageRes = canSendMessage ? message : 'Erro inesperado do servidor.';
  response.status(statusCode).send({ mensagem: messageRes, erros: object });
});

export { app }
