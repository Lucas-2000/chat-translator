import { Express, Request, Response } from "express";
import { DestroyQueue } from "../../../core/queue/service/destroy/destroy-queue";

export class DestroyQueueController {
  constructor(server: Express, useCase: DestroyQueue) {
    server.delete("/queue", async (req: Request, res: Response) => {
      await useCase.execute();

      res.status(201).json({ msg: "Queue destroyed successfully." });
    });
  }
}
