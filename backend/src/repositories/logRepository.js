const { getPaginationInfo } = require('../utils/pagination');

class LogRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllLogs({ limitInt, pageInt }) {
    let query = `
    SELECT
        l.id, p.id, p.title, p.category, l.message, l.created_at
    FROM
        logs l
    INNER JOIN
        products p
    ON
        l.product_id = p.id
    AND
      p.deleted_at IS NULL
    ORDER BY
        l.created_at DESC
    `;

    const count = await this._countLogs(query, []);

    query += ` LIMIT $1 OFFSET $2`;

    const { rows } = await this.db.query(query, [
      limitInt,
      limitInt * (pageInt - 1)
    ]);

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

  async _countLogs(query, args) {
    const countQuery = `
    SELECT 
        COUNT(1)
    FROM
        (${query}) AS count_table
    `;

    const { rows } = await this.db.query(countQuery, args);
    return Number(rows.at(0).count);
  }
}

module.exports = LogRepository;
