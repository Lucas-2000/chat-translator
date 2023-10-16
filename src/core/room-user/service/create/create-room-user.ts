import { UseCase } from "../../../shared/interfaces/use-case";
import { randomUUID } from "crypto";
import { RoomUserRepository } from "../../repository/room-user-repository";
import { UserRepository } from "../../../user/repository/user-repository";
import { RoomRepository } from "../../../room/repository/room-repository";
import { Queue } from "../../../shared/queue/queue";

type Data = {
  roomId: string;
  userId: string;
};

export class CreateRoomUser implements UseCase<Data, void> {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly queue: Queue
  ) {}

  async execute(data: Data): Promise<void> {
    const { roomId, userId } = data;

    const roomUserCount = await this.roomUserRepository.count(roomId);

    if (roomUserCount >= 2) {
      throw new Error("Room is full");
    }

    const room = await this.roomRepository.findById(roomId);

    if (!room) throw new Error("Room not found");

    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    const queueSize = this.queue.size();

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
