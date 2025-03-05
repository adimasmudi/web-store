const ProductRepository = require('../repositories/productRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
  }

  async getAllProducts(requestQuery) {
    const { search, category, limit, page } = requestQuery;
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

  async updateProduct(requestBody, id) {
    return this.productRepository.updateProduct(requestBody, id);
  }
}

module.exports = ProductService;
