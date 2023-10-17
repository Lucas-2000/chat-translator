import { Express, Request, Response } from "express";
import { CreateRoomUser } from "../../../core/room-user/service/create/create-room-user";

export class CreateRoomUserController {
  constructor(server: Express, useCase: CreateRoomUser) {
    server.post("/room-users", async (req: Request, res: Response) => {
      const { roomId, userId1, userId2 } = req.body;

      await useCase.execute({ roomId, userId1, userId2 });

      res.status(201).json({ msg: "Room User created successfully" });
    });
  }
}
