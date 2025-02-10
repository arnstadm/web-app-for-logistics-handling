//server file for API

const Express = require('express');
const BodyParser = require('body-parser');
const port = 5000;
const cors = require('cors');
const api = require('./routes/auth.routes');
var server = Express();

//server settings
server.use(cors());
server.use(BodyParser.urlencoded({ extended: false }));
server.use(BodyParser.json({ limit: '50MB' }));

//static resources
server.use('/public', Express.static('public'));

server.use('/api', api);
server.use(Express.json());

// DB connection
server.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});

server.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
