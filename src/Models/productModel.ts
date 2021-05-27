// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
dotenv.config()

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class ProductInterface {
  async index(): Promise<Product[]> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'select * from products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    }
    catch (error) {
      throw new Error(`CANT GET ITEMS FROM  PRODUCTS TABLE: ERROR ${error}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'select * from products where id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    }
    catch (error) {
      throw new Error(`CANT GET THIS ITEM ${id} FROM  PRODUCTS TABLE: ERROR ${error}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'insert into products(name,price,category) values($1,$2,$3) RETURNING *'
      const result = await connection.query(sql, [p.name, p.price, p.category])
      connection.release()
      return result.rows[0]
    }
    catch (error) {
      throw new Error(`CANT INSERT THIS ITEM INTO PRODUCTS TABLE: ERROR ${error}`)
    }
  }
}