import { UseCase } from "../../../shared/interfaces/use-case";
import { RoomUserRepository } from "../../repository/room-user-repository";

type Data = {
  id: string;
};

export class DeleteRoomUser implements UseCase<Data, void | null> {
  constructor(private readonly roomUserRepository: RoomUserRepository) {}

  async execute(data: Data): Promise<void | null> {
    const { id } = data;

    const roomUser = await this.roomUserRepository.findById(id);

    if (!roomUser) throw new Error("Room User not found");

    await this.roomUserRepository.delete(id);
  }
}
