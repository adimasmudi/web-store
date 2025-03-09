class ProductService {
  constructor(repositories) {
    this.productRepository = repositories.productRepository;
    this.logRepository = repositories.logRepository;
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

  async getProductById(id) {
    return this.productRepository.getProductById(id);
  }

  async addProduct(requestBody) {
    const product = await this.productRepository.getProductByTitle(
      requestBody.title
    );
    if (product) {
      throw new Error(`product with title ${requestBody.title} already exist`);
    }

    return this.productRepository.addProduct(requestBody);
  }

  async updateProduct(requestBody, id) {
    const productById = await this.productRepository.getProductById(id);
    if (!productById) {
      throw new Error(`product with id ${id} doesn't exist`);
    }

    const productByTitle = await this.productRepository.getProductByTitle(
      requestBody.title
    );
    if (productByTitle) {
      throw new Error(`product with title ${requestBody.title} already exist`);
    }

    return this.productRepository.updateProduct(requestBody, id);
  }

  async updateProductStock(deltaStock, id) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`product with id ${id} doesn't exist`);
    }

    if (product.stock + deltaStock < 0) {
      throw new Error(`product stock should at least 0`);
    }

    const result = this.productRepository.updateProductStock(deltaStock, id);

    const logMessage = `Stock of product with id ${id} updated from ${
      product.stock
    } to ${product.stock + deltaStock}`;
    const insertErr = await this.logRepository.addLog(id, logMessage);

    if (insertErr) {
      throw new Error('error when trying to add new log');
    }

    return result;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`product with id ${id} doesn't exist`);
    }
    return this.productRepository.deleteProduct(id);
  }
}

module.exports = ProductService;
