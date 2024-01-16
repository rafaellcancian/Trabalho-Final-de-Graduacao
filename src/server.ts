import http from 'http';
import { app } from './app';

/** Servidor */
const server = http.createServer(app);
const port = 3000;
server.listen(port, '0.0.0.0', () => console.log('O servidor está em execução na porta: ' + port));
