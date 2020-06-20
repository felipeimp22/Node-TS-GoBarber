// node 12.18.1
import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json()); // Use to application understand JSON
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`Api Started 👨‍💻 on port ${port}`);
});
