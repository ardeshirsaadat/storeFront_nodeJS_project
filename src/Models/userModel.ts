// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
import bycrypt from 'bcrypt'
dotenv.config()
const { SALT_ROUNDS, BYCRYPT_PASSWORD } = process.env


export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserInterface {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'select * from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    }
    catch (error) {
      throw new Error(`CANT GET ITEMS FROM  UserS TABLE: ERROR ${error}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'select * from users where id=($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    }
    catch (error) {
      throw new Error(`CANT GET THIS ITEM FROM  UserS TABLE: ERROR ${error}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      //@ts-ignore
      const connection = await Client.connect()
      const sql = 'insert into users(name,price,category) values($1,$2,$3) RETURNING *'
      const hashed_password = bycrypt.hashSync(u.password + BYCRYPT_PASSWORD, (SALT_ROUNDS as unknown) as string)
      const result = await connection.query(sql, [u.firstName, u.lastName, hashed_password])
      connection.release()
      return result.rows[0]
    }
    catch (error) {
      throw new Error(`CANT INSERT THIS ITEM INTO UserS TABLE: ERROR ${error}`)
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {

    //@ts-ignore
    const connection = await Client.connect()
    const sql = 'select password from users where firstName==($1)'
    const result = await connection.query(sql, userName)

    if (result.rows.length) {
      const user = result.rows[0]
      connection.release()
      const password_checker = bycrypt.compareSync(password, user.password)
      if (password_checker) {
        return user
      }
    }
    return null
  }
}