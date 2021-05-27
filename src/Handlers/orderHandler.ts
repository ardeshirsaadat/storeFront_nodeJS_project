import { Order, OrderInterface } from '../Models/orderModel'
import express from 'express'
const order = new OrderInterface()

const showHandler = async (req: express.Request, res: express.Response) => {
  try {
    const id = parseInt(req.params.id)
    const result = await order.show(id)
    res.json(result)
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

const createHandler = async (req: express.Request, res: express.Response) => {
  try {
    const ord: Order = {
      id: req.body.id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status
    }
    const result = await order.create(ord)
    res.json(result)
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}


const orderModelHandler = async (app: express.Application) => {
  app.get('/users/:id/orders', showHandler)
  app.post('/orders', createHandler)
}