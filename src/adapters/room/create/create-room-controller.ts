import { Express, Request, Response } from "express";
import { CreateRoom } from "../../../core/room/service/create/create-room";

export class CreateRoomController {
  constructor(server: Express, useCase: CreateRoom) {
    server.post("/rooms", async (req: Request, res: Response) => {
      await useCase.execute();

      res.status(201).json({ msg: "Room created successfully" });
    });
  }
}
