import { Express, Request, Response } from "express";
import { DeleteRoomUser } from "../../../core/room-user/service/delete/delete-room-user";

export class DeleteRoomUserController {
  constructor(server: Express, useCase: DeleteRoomUser) {
    server.delete("/room-users/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      await useCase.execute({ id });

      res.status(200).json({ msg: "Room user delete successfully" });
    });
  }
}
