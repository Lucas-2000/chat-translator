import { Express, Request, Response } from "express";
import { JoinQueue } from "../../../core/queue/service/join/join-queue";

export class JoinQueueController {
  constructor(server: Express, useCase: JoinQueue) {
    server.post("/queue", async (req: Request, res: Response) => {
      const { userId } = req.body;

      await useCase.execute({ userId });

      res.status(201).json({ msg: "User joined queue successfully." });
    });
  }
}
