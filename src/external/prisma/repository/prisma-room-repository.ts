import { Room } from "../../../core/room/model/room";
import { RoomRepository } from "../../../core/room/repository/room-repository";
import { prisma } from "../../../core/shared/config/prismaClient";

export class PrismaRoomRepository implements RoomRepository {
  async create(room: Room): Promise<void> {
    await prisma.room.create({
      data: room,
    });
  }

  async findAll(): Promise<Room[]> {
    return await prisma.room.findMany();
  }

  async findById(id: string): Promise<Room | null> {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    return room;
  }

  async delete(id: string): Promise<void | null> {
    const existingRoom = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!existingRoom) return null;

    await prisma.room.delete({
      where: { id },
    });
  }
}
