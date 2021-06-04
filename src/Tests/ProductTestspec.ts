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

  it('create method should add a product to database', async () => {
    const result = await productObject.create({
      name: 'apple',
      price: 100,
      category: 'fruits'
    })
    expect(result.name).toEqual('apple')

  })

  it('show method should get a specific product', async () => {
    const result = await productObject.show(2)
    expect(result.name).toEqual('apple')

  })

  it('index method should get all the products from database', async () => {
    const result = await productObject.index()
    expect(result.length).toBeGreaterThan(0)

  })
});
