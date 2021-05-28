import supertest from "supertest";
import app from '../server';
import { Product } from "../Models/productModel";
import { User } from "../Models/userModel"
import { Order } from "../Models/orderModel"
import jsonwebtoken from 'jsonwebtoken'

const request = supertest(app);

describe("testing /products /users /orders endpoints", () => {

  const iphone: Product = {
    id: 1,
    name: "iphone",
    price: 1200,
    category: "electronics"
  };

  const myorder: Order = {
    id: 1,
    product_id: 1,
    quantity: 50,
    user_id: 1,
    status: true
  }

  let token: string;

  beforeAll(async () => {
    const response = await request.post("/users")
      .send({
        firstname: "ardeshir",
        lastname: "saadat",
        password: "secret"
      });

    token = response.body.token;
  });

  it("should insert iphone into database", async () => {
    const response = await request.post("/products")
      .send(iphone)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body.name).toEqual("iphone");

  });

  it("should get product iphone", async () => {
    const response = await request.get("/products/1")
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual("iphone");
  });

  it("should insert order into database", async () => {
    const response = await request.post("/orders")
      .send(myorder)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body.status).toEqual(true);
  });

  it("should get myorder from orders", async () => {
    const response = await request.get("/users/1/orders")
      .expect(200);
  });
});