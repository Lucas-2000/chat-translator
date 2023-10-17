import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../config/jwtConfig";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) return response.status(401).json({ message: "Unauthorized" });

  const [, token] = authToken.split(" ");

  if (!jwtSecret) throw new Error("JWT Key not found!");

  try {
    verify(token, jwtSecret);

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Token invalid" });
  }
}
