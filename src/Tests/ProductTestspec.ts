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


  // it('create method should add a product', async () => {
  //   const result = await productObject.create({
  //     id: 1,
  //     name: 'iphone 112',
  //     price: 55,
  //     category: 'Elecronics',
  //   });
  //   expect(result).toEqual({
  //     id: 1,
  //     name: 'iphone 112',
  //     price: 55,
  //     category: 'Elecronics'
  //   });
  // });

  // it('index method should return a list of products', async () => {
  //   const result = await productObject.index();
  //   expect(result).toEqual([{
  //     id: 1,
  //     name: 'iphone 112',
  //     price: 55,
  //     category: 'Elecronics'
  //   }]);
  // });

  // it('show method should return the correct product', async () => {
  //   const result = await productObject.show(1);
  //   expect(result).toEqual({
  //     id: 1,
  //     name: 'iphone 112',
  //     price: 55,
  //     category: 'Elecronics'
  //   });
  // });
});