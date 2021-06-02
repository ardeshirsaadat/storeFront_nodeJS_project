// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
dotenv.config()

export type Order = {
  id: number;
  status: string;
  user_id: number
}

export class OrderInterface {
  async create(o: Order): Promise<Order> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'insert into orders(status,user_id) values($1,$2) RETURNING *'
      const result = await connection.query(sql, [o.status, o.user_id])
      connection.release()
      return result.rows[0]
    }
    catch (error) {
      throw new Error(`CANT INSERT ITEMS INTO  orderS TABLE: ERROR ${error}`)
    }
  }

  async show(user_id: number): Promise<Order[]> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'select * from orders where user_id=($1)'
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows
    }
    catch (error) {
      throw new Error(`CANT GET THIS USER'S ORDERS : ERROR ${error}`)
    }
  }
  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    // get order to see if it is open
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== "active") {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }

    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
        .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}