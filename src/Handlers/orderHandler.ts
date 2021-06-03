import { Order, OrderInterface } from '../Models/orderModel'
import express from 'express'
import authorize from '../Middleware/authorization'
const order = new OrderInterface()

const showHandler = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await order.show(id)
    res.send(result)
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

const createHandler = async (req: express.Request, res: express.Response) => {
  try {
    const ord: Order = {
      id: req.body.id,
      user_id: req.body.user_id,
      status: req.body.status
    }
    const result = await order.create(ord)
    res.json(result)
  } catch (error) {
    res.status(404)
    res.send(error)
  }
}

const addproduct = async (req: express.Request, res: express.Response) => {
  try {
    const productId = req.body.product_id
    const orderId = req.body.order_id
    const quantity = parseInt(req.body.quantity)
    const result = await order.addProduct(quantity, orderId, productId)
    res.send(result)
  } catch (error) {
    res.status(404)
    res.send(error)
  }
}

const orderModelHandler = async (app: express.Application) => {
  app.get('/users/:id/orders', authorize, showHandler)
  app.post('/orders', authorize, createHandler)
  app.post('/orders/:id/products', addproduct)
}

export default orderModelHandler