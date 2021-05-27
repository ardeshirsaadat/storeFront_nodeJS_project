import { Order, orderInterface } from '../Models/orderModel'

const orderObject = new orderInterface()

describe("order Model", () => {
  it('should have a show method', () => {
    expect(orderObject.create).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderObject.show).toBeDefined();
  });

  it('create method should add a order', async () => {
    const result = await orderObject.create({
      id: 1,
      product_id: 11,
      quantity: 5,
      user_id: 1,
      status: true
    });
    expect(result).toEqual({
      id: 1,
      product_id: 11,
      quantity: 5,
      user_id: 1,
      status: true
    });
  });

  it('show method should add a order', async () => {
    const result = await orderObject.show(1);
    expect(result).toEqual([{
      id: 1,
      product_id: 11,
      quantity: 5,
      user_id: 1,
      status: true
    }]);
  });

});