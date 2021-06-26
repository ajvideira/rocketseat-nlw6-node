import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type Payload = {
  sub: string;
};

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const token = authToken.replace('Bearer ', '');

  try {
    const { sub } = verify(
      token,
      '71137569747e21ffc3c820f3a705fcb7'
    ) as Payload;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
