import { UseCase } from "../../../shared/interfaces/use-case";
import { randomUUID } from "crypto";
import { RoomUserRepository } from "../../repository/room-user-repository";
import { UserRepository } from "../../../user/repository/user-repository";
import { RoomRepository } from "../../../room/repository/room-repository";

type Data = {
  roomId: string;
  userId: string;
};

export class CreateRoomUser implements UseCase<Data, void> {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(data: Data): Promise<void> {
    const { roomId, userId } = data;

    // gerar um uuid aleatório para a sala
    const id = randomUUID();

    const room = await this.roomRepository.findById(roomId);

    if (!room) throw new Error("Room not found");

    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    await this.roomUserRepository.create({ id, userId, roomId });
  }
}
