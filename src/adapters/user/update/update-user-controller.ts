import { Express, Request, Response } from "express";
import { UpdateUser } from "../../../core/user/service/update/update-user";

export class UpdateUserController {
  constructor(readonly server: Express, readonly useCase: UpdateUser) {
    server.put("/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, username, email, password, language } = req.body;

      const user = await useCase.execute({
        id,
        name,
        username,
        email,
        password,
        language,
      });

      res.status(201).json(user);
    });
  }
}
