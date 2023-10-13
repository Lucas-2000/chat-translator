import { randomUUID } from "crypto";
import { RoomUserRepository } from "../../core/room-user/repository/room-user-repository";
import { RoomUser } from "../../core/room-user/model/room-user";

export class InMemoryRoomUserRepository implements RoomUserRepository {
  private readonly roomUsers: RoomUser[] = [];

  async findAll(): Promise<RoomUser[]> {
    return this.roomUsers;
  }

  async findById(id: string): Promise<RoomUser | null> {
    return this.roomUsers.find((roomUsers) => roomUsers.id === id) ?? null;
  }

  async count(id: string): Promise<number> {
    let acc = 0;
    this.roomUsers.forEach((roomUsers) => {
      if (roomUsers.id === id) {
        acc++;
      }

      return acc;
    });
    return acc;
  }

  async create(roomUsers: RoomUser): Promise<void> {
    const newRoomUser = { ...roomUsers, id: randomUUID() };
    this.roomUsers.push(newRoomUser);
  }

  async delete(id: string): Promise<void | null> {
    const index = this.roomUsers.findIndex((r) => r.id === id);

    if (index === -1) {
      return null;
    }

    this.roomUsers.splice(index, 1);
  }
}
