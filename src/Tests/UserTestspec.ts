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

  it('create method should add a user to database', async () => {
    const result = await userObject.create({
      firstName: 'hasti',
      lastName: 'alag',
      password: 'adf'
    })
    expect(result).toBeTrue

  })

  it('show method should get a specific user', async () => {
    const result = await userObject.show(2)
    console.log(result)
    expect(result.password).toBeTruthy

  })

  it('index method should get all the users from database', async () => {
    const result = await userObject.index()
    expect(result.length).toBeGreaterThan(0)

  })

  it('authenticate method should check wheter the password provided correct or not', async () => {
    const result = await userObject.authenticate('hast', 'fdadsfad')
    expect(result).toBeNull

  })

});