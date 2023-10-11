import { UseCase } from "../../../shared/interfaces/use-case";
import { RoomUserRepository } from "../../repository/room-user-repository";
import { RoomUser } from "../../model/room-user";

export class FindAllRoomUsers implements UseCase<void, RoomUser[]> {
  constructor(private readonly roomUserRepository: RoomUserRepository) {}

  async execute(): Promise<RoomUser[]> {
    const roomUsers = await this.roomUserRepository.findAll();

    return roomUsers;
  }
}
