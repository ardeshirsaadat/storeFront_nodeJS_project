import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  Database,
  Username,
  Port,
  PostgresHost,
  Database_test,
  ENV
} = process.env
let Client
console.log(ENV)
if (ENV === 'test') {
  Client = new Pool({
    host: PostgresHost,
    database: Database,
    user: Username,
    port: Number(Port)
  })
}

if (ENV === 'dev') {
  Client = new Pool({
    host: PostgresHost,
    database: Database_test,
    user: Username,
    port: Number(Port)
  })
}
export default Client