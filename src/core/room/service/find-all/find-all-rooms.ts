import { UseCase } from "../../../shared/interfaces/use-case";
import { Room } from "../../model/room";
import { RoomRepository } from "../../repository/room-repository";

export class FindAllRooms implements UseCase<void, Room[]> {
  constructor(private readonly roomRepository: RoomRepository) {}

  execute(): Promise<Room[]> {
    const rooms = this.roomRepository.findAll();

    return rooms;
  }
}
