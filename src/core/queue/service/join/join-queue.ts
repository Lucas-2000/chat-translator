import { UseCase } from "../../../shared/interfaces/use-case";
import { Queue } from "../../../shared/queue/queue";
import { UserRepository } from "../../../user/repository/user-repository";

interface Data {
  userId: string;
}

export class JoinQueue implements UseCase<Data, void> {
  constructor(private queue: Queue, private userRepository: UserRepository) {}

  async execute(data: Data): Promise<void> {
    const { userId } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    const userIsAlreadyOnQueue = await this.queue.isUserInQueue(userId);

    if (userIsAlreadyOnQueue) throw new Error("User is already on queue");

    try {
      await this.queue.store(userId);
    } catch (error) {
      throw new Error("Erro on put user on queue.");
    }
  }
}
