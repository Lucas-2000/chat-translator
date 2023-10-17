import { Express, Request, Response } from "express";
import { MakeTranslation } from "../../../core/translation/service/make/make-translation";

export class MakeTranslationController {
  constructor(server: Express, useCase: MakeTranslation) {
    server.post("/translation", async (req: Request, res: Response) => {
      const { userId, message } = req.body;

      const response = await useCase.execute({ userId, message });

      res.status(200).json({ translatedText: response });
    });
  }
}
