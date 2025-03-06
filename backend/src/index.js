require('dotenv').config();
const fastify = require('fastify')({
  logger: true
});
fastify.register(require('@fastify/postgres'), {
  connectionString:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE_NAME}`
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
