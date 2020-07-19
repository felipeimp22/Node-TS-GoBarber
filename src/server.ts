// node 12.18.1
// Reflect-metadata se nao importar ira dar erro pois o ts precisa disso para usar os decorators
import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import './database';

const app = express();
app.use(express.json()); // Use to application understand JSON
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`Api Started on port => ${port}`);
});
