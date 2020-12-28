const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);
const listener = server.listen(process.env.PORT || 3000, () => {
  console.log(`JSON Server is running on port ${listener.address().port}`);
});
