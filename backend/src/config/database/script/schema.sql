CREATE TABLE "products" (
    "id" BIGSERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL UNIQUE,
    "price" DECIMAL(10,2) NOT NULL CHECK (price > 0),
    "description" TEXT,
    "category" VARCHAR(255) NOT NULL,
    "image_path" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    "created_at" TIMESTAMP NOT NULL DEFAULT (now()),
    "updated_at" TIMESTAMP NOT NULL DEFAULT (now()),
    "deleted_at" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "logs" (
    "id" BIGSERIAL PRIMARY KEY,
    "product_id" BIGINT NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT (now())
);

ALTER TABLE "logs" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
