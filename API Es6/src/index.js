import express from 'express';
import bodyParser, { json as _json } from 'body-parser';
import cors from 'cors';
import router from './routes/routes';
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50MB' }));
app.use('/api', router);
app.use(express.json());

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
export default app;
