const {
  getAllProductsSchema,
  addProductSchema,
  updateProductSchema,
  updateProductStockSchema,
  deleteProductSchema
} = require('../schemas/productSchema');

async function productRoutes(fastify, options) {
  const { productController } = options;

  fastify.get('/', { schema: getAllProductsSchema }, async (req, res) =>
    productController.getAllProducts(req, res)
  );

  fastify.post('/', { schema: addProductSchema }, async (req, res) =>
    productController.addProduct(req, res)
  );

  fastify.put('/:id', { schema: updateProductSchema }, async (req, res) =>
    productController.updateProduct(req, res)
  );

  fastify.patch(
    '/:id/stock',
    { schema: updateProductStockSchema },
    async (req, res) => productController.updateProductStock(req, res)
  );

  fastify.delete('/:id', { schema: deleteProductSchema }, async (req, res) =>
    productController.deleteProduct(req, res)
  );
}

module.exports = productRoutes;
