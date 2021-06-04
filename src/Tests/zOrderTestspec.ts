import { Order, OrderInterface } from '../Models/orderModel'

const orderObject = new OrderInterface()

describe("order Model", () => {
  it('should have a show method', () => {
    expect(orderObject.create).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderObject.show).toBeDefined();
  });

  it('should add a order', () => {
    expect(orderObject.addProduct).toBeDefined();
  });

  it('create method should add a order to database', async () => {
    const result = await orderObject.create({
      id: 2,
      status: 'active',
      user_id: 1
    })
    expect(result.status).toEqual('active')

  })

  it('show method should get a specific order', async () => {
    const result = await orderObject.show(1)
    console.log(result)
    expect(result.length).toBeGreaterThan(0)

  })

  it('index method should get all the orders from database', async () => {
    const result = await orderObject.addProduct(50, '2', '2')
    // console.log(result)
    expect(result.quantity).toEqual(50)

  })

});