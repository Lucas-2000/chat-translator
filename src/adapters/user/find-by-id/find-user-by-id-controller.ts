import { Express, Request, Response } from "express";
import { FindUserById } from "../../../core/user/service/find-by-id/find-user-by-id";

export class FindUserByIdController {
  constructor(readonly server: Express, readonly useCase: FindUserById) {
    server.get("/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      const user = await useCase.execute({ id });

      res.status(200).json(user);
    });
  }
}
