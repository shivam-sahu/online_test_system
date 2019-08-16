const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api/users', { target: 'http://localhost:3001/' }));
};