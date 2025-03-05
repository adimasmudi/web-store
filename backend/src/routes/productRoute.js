const ProductController = require('../controllers/productController');
const {
  getAllProductsSchema,
  addProductSchema
} = require('../schemas/productSchema');

async function productRoutes(fastify) {
  const productController = new ProductController(fastify);

  fastify.get('/', { schema: getAllProductsSchema }, async (req, res) =>
    productController.getAllProducts(req, res)
  );

  fastify.post('/', { schema: addProductSchema }, async (req, res) =>
    productController.addProduct(req, res)
  );
}

module.exports = productRoutes;
