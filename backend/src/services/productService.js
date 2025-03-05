const ProductRepository = require('../repositories/productRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
  }

  async getAllProducts({ search, category }) {
    return this.productRepository.getAllProducts(search, category);
  }
}

module.exports = ProductService;
