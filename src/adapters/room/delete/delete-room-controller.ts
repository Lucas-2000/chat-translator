import { Express, Request, Response } from "express";
import { DeleteRoom } from "../../../core/room/service/delete/delete-room";

export class DeleteRoomController {
  constructor(server: Express, useCase: DeleteRoom) {
    server.delete("/rooms/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      await useCase.execute({ id });

      res.status(200).json({ msg: "Room delete successfully" });
    });
  }
}
