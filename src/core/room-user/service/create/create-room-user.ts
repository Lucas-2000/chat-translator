import { UseCase } from "../../../shared/interfaces/use-case";
import { randomUUID } from "crypto";
import { RoomUserRepository } from "../../repository/room-user-repository";
import { UserRepository } from "../../../user/repository/user-repository";
import { RoomRepository } from "../../../room/repository/room-repository";
import { Queue } from "../../../shared/queue/queue";

type Data = {
  roomId: string;
  userId1: string;
  userId2: string;
};

export class CreateRoomUser implements UseCase<Data, void> {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly queue: Queue
  ) {}

  async execute(data: Data): Promise<void> {
    const { roomId, userId1, userId2 } = data;

    const roomUserCount = await this.roomUserRepository.count(roomId);

    if (roomUserCount >= 2) {
      throw new Error("Room is full");
    }

    const room = await this.roomRepository.findById(roomId);

    if (!room) throw new Error("Room not found");

    const userExists1 = await this.userRepository.findById(userId1);

    if (!userExists1) throw new Error("User 1 not found");

    const userExists2 = await this.userRepository.findById(userId2);

    if (!userExists2) throw new Error("User 2 not found");

    const queueSize = (await this.queue.getQueue()).length;

    if (queueSize < 2) throw new Error("Queue size must be at least 2");

    const user1 = await this.queue.retrieve();
    const user2 = await this.queue.retrieve();

    if (user1 === null || user2 === null)
      throw new Error("Error on retrieve user");

    // gerar um uuid aleatório
    const idUser1 = randomUUID();
    const idUser2 = randomUUID();

    await this.roomUserRepository.create({
      id: idUser1,
      userId: user1 as string,
      roomId,
    });
    await this.roomUserRepository.create({
      id: idUser2,
      userId: user2 as string,
      roomId,
    });
  }
}
