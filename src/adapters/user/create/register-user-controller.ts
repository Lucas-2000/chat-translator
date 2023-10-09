import { Express, Request, Response } from "express";
import { RegisterUser } from "../../../core/user/service/create/register-user";

export class RegisterUserController {
  constructor(readonly server: Express, readonly useCase: RegisterUser) {
    server.post("/users", async (req: Request, res: Response) => {
      const { name, username, email, password, language } = req.body;

      await useCase.execute({ name, username, email, password, language });

      res.status(201).json({ msg: "User created successfully" });
    });
  }
}
