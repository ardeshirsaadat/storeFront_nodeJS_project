import supertest from "supertest";
import app from '../server';
import { Product } from "../Models/productModel";
import { User } from "../Models/userModel"
import { Order } from "../Models/orderModel"
import jsonwebtoken from 'jsonwebtoken'

const request = supertest(app);

describe("testing /products /users /orders endpoints", () => {

  const iphone: Product = {
    name: "iphone",
    price: 1200,
    category: "electronics"
  };

  const myorder: Order = {
    id: 1,
    user_id: 1,
    status: 'active'

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
    console.log(token)
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

  it("should get all products", async () => {
    const response = await request.get("/products")
      .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual("iphone");
  });

  it("should insert order into database", async () => {
    const response = await request.post("/orders")
      .send(myorder)
      .set("Authorization", "bearer " + token)
      .expect(200);

    expect(response.body.status).toEqual('active');
  });

  it("should get myorder from orders", async () => {
    const response = await request.get("/users/1/orders")
      .set("Authorization", "bearer " + token)
      .expect(200);
  });

  it("it should get a user", async () => {
    const response = await request.get("/users/1")
      .send({
        firstname: "ardeshir",
        lastname: "saadat",
        password: "secret"
      })
      .expect(200);
  });

  it("should get all users", async () => {
    const response = await request.get("/users")
      .expect(200);
    console.log(response.body)
    expect(response.body[0].firstname).toEqual('ardeshir');
  });

  it("should add product to an order", async () => {
    const response = await request.post("/orders/1/products")
      .send({ product_id: 1, order_id: 1, quantity: 20 })
      .expect(200);

    expect(response.body.quantity).toEqual(20);
  });
});