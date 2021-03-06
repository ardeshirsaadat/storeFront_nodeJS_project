// @ts-ignore
import Client from '../database';
import dotenv from 'dotenv';
import bycrypt from 'bcrypt'
dotenv.config()
const { saltRounds, BYCRYPT_PASSWORD } = process.env

console.log(BYCRYPT_PASSWORD)
export type User = {
  firstName: string;
  lastName: string;
  password: string;
}

export class UserInterface {
  async index(): Promise<User[]> {
    try {
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

  async create(u: User): Promise<boolean> {
    try {
      const connection = await Client.connect()
      const sql = 'insert into users(firstName,lastName,password) values($1,$2,$3) RETURNING *'
      const hashed_password = bycrypt.hashSync(u.password + BYCRYPT_PASSWORD, parseInt(saltRounds as string))
      const result = await connection.query(sql, [u.firstName, u.lastName, hashed_password])
      connection.release()
      return true
    }
    catch (error) {
      throw new Error(`CANT INSERT THIS ITEM INTO UserS TABLE: ERROR ${error}`)
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    const connection = await Client.connect()
    const sql = 'select password from users where firstname=($1)'
    const result = await connection.query(sql, [userName])

    if (result.rows.length) {
      const user = result.rows[0]
      connection.release()
      const password_checker = bycrypt.compareSync(password + BYCRYPT_PASSWORD, user.password)
      if (password_checker) {
        return user
      }
    }
    return null
  }
}