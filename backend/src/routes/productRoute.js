const ProductController = require('../controllers/productController');

async function productRoutes(fastify) {
  const productController = new ProductController(fastify);

  fastify.get('/', (req, res) => productController.getAllProducts(req, res));
}

module.exports = { productRoutes };
