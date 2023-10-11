import { Express, Request, Response } from "express";
import { FindAllRoomUsers } from "../../../core/room-user/service/find-all/find-all-room-users";

export class FindAllRoomUsersController {
  constructor(server: Express, useCase: FindAllRoomUsers) {
    server.get("/room-users", async (req: Request, res: Response) => {
      const roomUser = await useCase.execute();

      res.status(201).json(roomUser);
    });
  }
}
