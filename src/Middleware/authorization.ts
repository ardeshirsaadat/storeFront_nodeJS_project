import jsonwebtoken, { Secret } from 'jsonwebtoken';
import express from 'express';
const authorize = (req: express.Request, res: express.Response, next: Function) => {
  try {
    const auth = req.headers.authorization
    const token = auth?.split(" ")[1]
    const result = jsonwebtoken.verify(token as string, (process.env.Token_key as unknown) as Secret)
    next()
  }
  catch (error) {
    res.status(401)
  }
}