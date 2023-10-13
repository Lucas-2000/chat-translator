import { RoomUser } from "../model/room-user";

export interface RoomUserRepository {
  create(roomUser: RoomUser): Promise<void>;
  findAll(): Promise<RoomUser[]>;
  findById(id: string): Promise<RoomUser | null>;
  count(id: string): Promise<number>;
  delete(id: string): Promise<void | null>;
}
