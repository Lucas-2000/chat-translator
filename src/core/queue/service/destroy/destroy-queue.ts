import { UseCase } from "../../../shared/interfaces/use-case";
import { Queue } from "../../../shared/queue/queue";

export class DestroyQueue implements UseCase<void, void> {
  constructor(private queue: Queue) {}

  async execute(): Promise<void> {
    try {
      await this.queue.destroy();
    } catch (error) {
      throw new Error("Erro on destroy queue.");
    }
  }
}
