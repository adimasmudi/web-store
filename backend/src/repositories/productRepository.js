class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllProducts(search) {
    const query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    `;
    const { rows } = await this.db.query(query);
    return rows;
  }
}

module.exports = ProductRepository;
