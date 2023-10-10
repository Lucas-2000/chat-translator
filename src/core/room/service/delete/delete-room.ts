import { UseCase } from "../../../shared/interfaces/use-case";
import { RoomRepository } from "../../repository/room-repository";

type Data = {
  id: string;
};

export class DeleteRoom implements UseCase<Data, void | null> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(data: Data): Promise<void | null> {
    const { id } = data;

    const room = await this.roomRepository.findById(id);

    if (!room) throw new Error("Room not found");

    await this.roomRepository.delete(id);
  }
}
