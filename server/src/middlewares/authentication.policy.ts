import { Response, NextFunction } from "express";

export default (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    console.log(req);
    res.status(403).send({
      meta: {
        type: "error",
        code: 403,
        message: "session authentication failed"
      }
    });
  } else {
    next();
  }
};
