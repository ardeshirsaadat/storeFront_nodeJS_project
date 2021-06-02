import { Product, ProductInterface } from '../Models/productModel'
import authorize from '../Middleware/authorization'
import express from 'express'
const product = new ProductInterface()
const indexHandler = async (req: express.Request, res: express.Response) => {
  try {
    const result = await product.index()
    res.json(result)
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

const showHandler = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await product.show(id)
    res.json(result)
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

const createHandler = async (req: express.Request, res: express.Response) => {
  try {
    const prod: Product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    }
    const result = await product.create(prod)
    res.send(result)
  } catch (error) {
    res.status(400)
    res.send(error)
  }
}


const productModelHandler = async (app: express.Application) => {
  app.get('/products', indexHandler)
  app.get('/products/:id', showHandler)
  app.post('/products', authorize, createHandler)
}

export default productModelHandler