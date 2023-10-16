import { UseCase } from "../../../shared/interfaces/use-case";
import { Queue } from "../../../shared/queue/queue";

export class ViewQueue implements UseCase<void, string[]> {
  constructor(private queue: Queue) {}

  async execute(): Promise<string[]> {
    try {
      const queue = await this.queue.getQueue();

      return queue;
    } catch (error) {
      throw new Error("Erro on get queue.");
    }
  }
}
