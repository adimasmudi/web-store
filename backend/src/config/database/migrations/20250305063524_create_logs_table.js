/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS "logs" (
        "id" BIGSERIAL PRIMARY KEY,
        "product_id" BIGINT NOT NULL,
        "message" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT (now())
    );

    ALTER TABLE "logs" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS logs;`);
};
