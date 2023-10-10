import { Express, Request, Response } from "express";
import { DeleteUser } from "../../../core/user/service/delete/delete-user";

export class DeleteUserController {
  constructor(readonly server: Express, readonly useCase: DeleteUser) {
    server.delete("/users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      await useCase.execute({ id });

      res.status(201).json({ msg: "User deleted successfully" });
    });
  }
}
