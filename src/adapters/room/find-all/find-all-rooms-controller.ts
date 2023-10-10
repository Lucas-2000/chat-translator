import { Express, Request, Response } from "express";
import { FindAllRooms } from "../../../core/room/service/find-all/find-all-rooms";

export class FindAllRoomsController {
  constructor(server: Express, useCase: FindAllRooms) {
    server.get("/rooms", async (req: Request, res: Response) => {
      const rooms = await useCase.execute();

      res.status(200).json(rooms);
    });
  }
}
