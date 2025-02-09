import express from 'express';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

import './database/index.js';
import routes from './routes.js';

//ESModules, precisa usar fileURLToPath e import.meta.url para obter __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const corsOptions = {
  origin: [
    'https://burguershop-eight.vercel.app',
    'https://burguershop-eight.vercel.app/login',
    'https://burguershop-eight.vercel.app/register',
    'https://burguershop-eight.vercel.app/menu',
    'https://burguershop-eight.vercel.app/cart',
    'https://burguershop-eight.vercel.app/checkout',
    'https://burguershop-eight.vercel.app/complete',
  ],
  Credential: true,
};

class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());

    // Servir arquivos estáticos para produtos e categorias
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );

    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
