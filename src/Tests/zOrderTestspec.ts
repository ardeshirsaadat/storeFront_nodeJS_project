import { Order, OrderInterface } from '../Models/orderModel'

const orderObject = new OrderInterface()

describe("order Model", () => {
  it('should have a show method', () => {
    expect(orderObject.create).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderObject.show).toBeDefined();
  });

  it('should add a product', () => {
    expect(orderObject.addProduct).toBeDefined();
  });

});