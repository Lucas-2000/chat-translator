import { Express, Request, Response } from "express";
import { RegisterUser } from "../../../core/user/service/create/register-user";
import { AuthUser } from "../../../core/user/service/auth/auth-user";

export class AuthUserController {
  constructor(readonly server: Express, readonly useCase: AuthUser) {
    server.post("/users/auth", async (req: Request, res: Response) => {
      const { username, password } = req.body;

      const user = await useCase.execute({ username, password });

      res.status(200).json(user);
    });
  }
}
