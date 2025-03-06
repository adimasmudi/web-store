require('dotenv').config();
const config = require('./config/env/env');
const fastify = require('fastify')({
  logger: true
});
fastify.register(require('@fastify/postgres'), {
  connectionString:
    config.databaseURL ||
    `postgresql://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}:${config.databasePort}/${config.databaseName}`
});

const productRoutes = require('./routes/productRoute');
const logRoutes = require('./routes/logRoute');

fastify.register(productRoutes, { prefix: '/products' });
fastify.register(logRoutes, { prefix: '/logs' });

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
