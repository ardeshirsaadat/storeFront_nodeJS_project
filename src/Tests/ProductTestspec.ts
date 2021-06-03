import { Product, ProductInterface } from '../Models/productModel'

const productObject = new ProductInterface()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(productObject.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productObject.create).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productObject.show).toBeDefined();
  });


});