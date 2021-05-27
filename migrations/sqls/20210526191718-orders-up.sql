/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    status boolean,
    user_id bigint REFERENCES users(id) NOT NULL,
    product_id bigint REFERENCES products(id) NOT NULL,
    quantity integer NOT NULL

);
