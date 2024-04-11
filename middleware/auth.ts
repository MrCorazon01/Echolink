import { Request, Response, NextFunction } from "express";
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const JWT_SECRET : string = "cuoiky1monphantichthietkehethong";

module.exports = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const [_, token] = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")
      : [];

    if (!token) return res.status(401).json("Not authorised");

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) return res.status(404).json("Not found");

      res.locals.user = user;

      next();
    } catch (err) {
      return res.status(401).json("Unauthorized");
    }
  }
);
