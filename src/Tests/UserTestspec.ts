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


  it('create method should add a user', async () => {
    const result = await userObject.create({
      id: 1,
      firstName: 'Ardeshir',
      lastName: 'Saadat',
      password: 'secret123@',
    });
    expect(result).toEqual({
      id: 1,
      firstName: 'Ardeshir',
      lastName: 'Saadat',
      password: 'secret123@'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await userObject.index();
    expect(result).toEqual([{
      id: 1,
      firstName: 'Ardeshir',
      lastName: 'Saadat',
      password: 'secret123@'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await userObject.show(1);
    expect(result).toEqual({
      id: 1,
      firstName: 'Ardeshir',
      lastName: 'Saadat',
      password: 'secret123@'
    });
  });

  it('authenticate method should return the correct user', async () => {
    const result = await userObject.authenticate('Ardeshir', 'secret123@');
    expect(result).toEqual({
      id: 1,
      firstName: 'Ardeshir',
      lastName: 'Saadat',
      password: 'secret123@'
    });
  });
});