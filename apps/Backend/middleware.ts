import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      msg: "No authorization header found",
    });
  }

  try {
    console.log(token);
    const response = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as JwtPayload;
    req.userId = response.id;
    next();
  } catch (e) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
}
