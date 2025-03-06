const ProductRepository = require('../repositories/productRepository');
const LogRepository = require('../repositories/logRepository');

const ProductService = require('../services/productService');
const LogService = require('../services/logService');

const ProductController = require('../controllers/productController');
const LogController = require('../controllers/logController');

const productRoutes = require('../routes/productRoute');
const logRoutes = require('../routes/logRoute');

async function serverSetup(fastify, config) {
  await fastify.register(require('@fastify/postgres'), {
    connectionString:
      config.databaseURL ||
      `postgresql://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}:${config.databasePort}/${config.databaseName}`
  });

  const productRepository = new ProductRepository(fastify);
  const logRepository = new LogRepository(fastify);

  const productService = new ProductService({
    productRepository,
    logRepository
  });
  const logService = new LogService({ logRepository });

  const productController = new ProductController({ productService });
  const logController = new LogController({ logService });

  fastify.register(
    (instance, opts, done) => {
      productRoutes(instance, { productController });
      done();
    },
    { prefix: '/products' }
  );

  fastify.register(
    (instance, opts, done) => {
      logRoutes(instance, { logController });
      done();
    },
    { prefix: '/logs' }
  );
}

module.exports = serverSetup;
