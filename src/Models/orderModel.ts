// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
dotenv.config()

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: boolean
}

export class orderInterface {
  async create(o: Order): Promise<Order> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'insert into orders(status,user_id,product_id,quantity) values($1,$2,$3,$4) RETURNING *'
      const result = await connection.query(sql, [o.status, o.user_id, o.product_id, o.quantity])
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
}