import { RoomRepository } from "./../../core/room/repository/room-repository";
import { randomUUID } from "crypto";
import { Room } from "../../core/room/model/room";

export class InMemoryRoomRepository implements RoomRepository {
  private readonly rooms: Room[] = [];

  async findAll(): Promise<Room[]> {
    return this.rooms;
  }

  async findById(id: string): Promise<Room | null> {
    return this.rooms.find((room) => room.id === id) ?? null;
  }

  async create(room: Room): Promise<void> {
    const newRoom = { ...room, id: randomUUID() };
    this.rooms.push(newRoom);
  }

  async delete(id: string): Promise<void | null> {
    const index = this.rooms.findIndex((r) => r.id === id);

    if (index === -1) {
      return null;
    }

    this.rooms.splice(index, 1);
  }
}
