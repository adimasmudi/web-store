require('dotenv').config();
const fastify = require('fastify')({
  logger: true
});

const config = require('./config/env/env');
const serverSetup = require('./server/setup');

async function startServer() {
  try {
    await serverSetup(fastify, config);

    await fastify.listen({ port: config.port || 5000 });
    console.log(`Server listening at http://localhost:${config.port || 5000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
