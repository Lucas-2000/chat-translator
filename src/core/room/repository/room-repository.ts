import { Room } from "../model/room";

export interface RoomRepository {
  create(room: Room): Promise<void>;
  findAll(): Promise<Room[]>;
  findById(id: string): Promise<Room | null>;
  delete(id: string): Promise<void | null>;
}
