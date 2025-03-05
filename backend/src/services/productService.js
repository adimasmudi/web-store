const ProductRepository = require('../repositories/productRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
  }

  async getAllProducts({ search, category, limit, page }) {
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    return this.productRepository.getAllProducts({
      search,
      category,
      limitInt,
      pageInt
    });
  }

  async addProduct(requestBody) {
    return this.productRepository.addProduct(requestBody);
  }
}

module.exports = ProductService;
