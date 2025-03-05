class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllProducts(search, category) {
    let query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    `;
    let idx = 1;
    const args = [];
    if (search) {
      query += ` WHERE title ILIKE $${idx}`;
      args.push(`%${search}%`);
      idx += 1;
    }

    if (category) {
      let prefix = 'WHERE';
      if (args.length > 0) {
        prefix = 'AND';
      }

      query += ` ${prefix} category = $${idx}`;
      args.push(category);
      idx += 1;
    }
    const { rows } = await this.db.query(query, args);
    return rows;
  }
}

module.exports = ProductRepository;
