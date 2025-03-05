const ProductRepository = require('../repositories/productRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
  }

  async getAllProducts() {
    return this.productRepository.getAllProducts();
  }
}

module.exports = ProductService;
