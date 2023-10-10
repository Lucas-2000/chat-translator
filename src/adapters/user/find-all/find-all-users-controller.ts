import { Express, Request, Response } from "express";
import { FindAllUsers } from "../../../core/user/service/find-all/find-all-users";

export class FindAllUsersController {
  constructor(readonly server: Express, readonly useCase: FindAllUsers) {
    server.get("/users", async (req: Request, res: Response) => {
      const users = await useCase.execute();

      res.status(200).json(users);
    });
  }
}
