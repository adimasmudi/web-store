class LogRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllLogs(limitInt, pageInt) {
    let query = `
    SELECT
        l.id, p.id, p.title, p.category, l.message, l.created_at
    FROM
        logs l
    INNER JOIN
        products p
    ON
        l.product_id = p.id
    ORDER BY
        l.created_at DESC
    `;

    const count = await this._countProducts(query, []);

    query += ` LIMIT $1 OFFSET $2`;

    const { rows } = await this.db.query(query, [limitInt, pageInt]);
    return getPaginationInfo(rows, count, limitInt);
  }

  async addLog(productId, message) {
    const query = `
    INSERT INTO
        "logs" ("product_id","message")
    VALUES
        ($1,$2)
    `;

    const { error } = await this.db.query(query, [productId, message]);

    return error;
  }
}

module.exports = LogRepository;
