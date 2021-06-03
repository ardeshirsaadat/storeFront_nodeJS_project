import { User, UserInterface } from '../Models/userModel'

const userObject = new UserInterface()

describe("user Model", () => {
  it('should have an index method', () => {
    expect(userObject.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userObject.create).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userObject.show).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(userObject.authenticate).toBeDefined();
  });
});