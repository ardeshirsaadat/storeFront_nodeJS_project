import { User, UserInterface } from '../Models/userModel'
import express from 'express'
import authorize from '../Middleware/authorization'
import jsonwebtoken, { Secret } from 'jsonwebtoken'

const user = new UserInterface()
const indexHandler = async (req: express.Request, res: express.Response) => {
  try {
    const result = await user.index()
    res.send(result)
  } catch (error) {
    res.status(404).send(error)
  }
}

const showHandler = async (req: express.Request, res: express.Response) => {
  try {
    const usrz: User = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: req.body.password
    }
    // const exisitingUser = await user.show(id)
    let existingUser = user.authenticate(usrz.firstName, usrz.password)
    let token = jsonwebtoken.sign({ usrz: existingUser }, process.env.Token_key as Secret)
    res.send({ token })
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}

const createHandler = async (req: express.Request, res: express.Response) => {
  try {
    const usrz: User = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: req.body.password
    }
    const newUser = await user.create(usrz)
    let token = jsonwebtoken.sign({ usrz: newUser }, process.env.Token_key as Secret)
    res.send({ token })
  } catch (error) {
    res.status(404)
    res.json(error)
  }
}


const userModelHandler = async (app: express.Application) => {
  app.get('/users', indexHandler)
  app.get('/users/:id', showHandler)
  app.post('/users', createHandler)
}

export default userModelHandler