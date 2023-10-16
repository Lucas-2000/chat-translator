import { Express, Request, Response } from "express";
import { ViewQueue } from "../../../core/queue/service/view/view-queue";

export class ViewQueueController {
  constructor(server: Express, useCase: ViewQueue) {
    server.get("/queue", async (req: Request, res: Response) => {
      const queue = await useCase.execute();

      res.status(201).json(queue);
    });
  }
}
