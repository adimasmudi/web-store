const ProductController = require('../controllers/productController');
const {
  getAllProductsSchema,
  addProductSchema,
  updateProductSchema
} = require('../schemas/productSchema');

async function productRoutes(fastify) {
  const productController = new ProductController(fastify);

  fastify.get('/', { schema: getAllProductsSchema }, async (req, res) =>
    productController.getAllProducts(req, res)
  );

  fastify.post('/', { schema: addProductSchema }, async (req, res) =>
    productController.addProduct(req, res)
  );

  fastify.put('/:id', { schema: updateProductSchema }, async (req, res) =>
    productController.updateProduct(req, res)
  );
}

module.exports = productRoutes;
