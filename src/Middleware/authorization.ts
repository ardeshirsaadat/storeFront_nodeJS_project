import jsonwebtoken, { Secret } from 'jsonwebtoken';
import express from 'express';
const authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const auth: string = req.headers.authorization as string
    if (!auth) {
      throw new Error("no token provided");
    }
    const token = auth.split(' ')[1]
    res.locals.decoded = jsonwebtoken.verify(token, process.env.Token_key as Secret)
    next()
  }
  catch (error) {
    res.status(401).send(error)
  }
}

export default authorize