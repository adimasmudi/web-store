const ProductController = require('../controllers/productController');
const { getAllProductsSchema } = require('../schemas/productSchema');

async function productRoutes(fastify) {
  const productController = new ProductController(fastify);

  fastify.get('/', { schema: getAllProductsSchema }, (req, res) =>
    productController.getAllProducts(req, res)
  );
}

module.exports = productRoutes;
