import jsonwebtoken, { Secret } from 'jsonwebtoken';
import express from 'express';
const authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const auth = req.headers.authorization
    const token = auth?.split(" ")[1]
    const result = jsonwebtoken.verify(token as string, process.env.Token_key as Secret)
    next()
  }
  catch (error) {
    res.status(401).send(error)
  }
}

export default authorize