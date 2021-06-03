import { Request, Response } from 'express'
import express from 'express'
import bodyParser from 'body-parser'
import productModelHandler from './Handlers/productHandler';
import orderModelHandler from './Handlers/orderHandler';
import userModelHandler from './Handlers/userHandler';
import { server } from 'typescript';
import cors from 'cors'

const app: express.Application = express()
const address = "0.0.0.0:3000"

app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

productModelHandler(app)
orderModelHandler(app)
userModelHandler(app)

export default app
