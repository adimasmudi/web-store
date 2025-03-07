/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Fetch data
  const data = [];
  await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((resData) =>
      resData.forEach((dt) =>
        data.push({
          title: dt.title,
          price: dt.price,
          description: dt.description,
          category: dt.category,
          image: dt.image,
          stock: Math.round(Math.random() * 100)
        })
      )
    );

  // Construct query
  let query = `
    INSERT INTO "products" ("title", "price", "description", "category", "image_path", "stock")
    SELECT * FROM (
  `;

  const args = [];
  data.forEach((p, i) => {
    query += `SELECT ?, ?::NUMERIC, ?, ?, ?, ?::INTEGER`;
    args.push(
      p.title,
      p.price,
      p.description,
      p.category,
      p.image,
      Math.round(Math.random() * 100)
    );

    if (i < data.length - 1) {
      query += ' UNION ALL ';
    }
  });

  query += `
    ) AS "new_data" ("title", "price", "description", "category", "image_path", "stock")
    WHERE NOT EXISTS (
      SELECT 1 FROM "products" WHERE "products"."title" = "new_data"."title"
    );
  `;

  await knex.raw(query, args);
};
