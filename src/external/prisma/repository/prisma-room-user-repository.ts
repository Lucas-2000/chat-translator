import { RoomUser } from "../../../core/room-user/model/room-user";
import { RoomUserRepository } from "../../../core/room-user/repository/room-user-repository";
import { prisma } from "../../../core/shared/config/prismaClient";

export class PrismaRoomUserRepository implements RoomUserRepository {
  async create(roomUser: RoomUser): Promise<void> {
    await prisma.roomUser.create({
      data: roomUser,
    });
  }

  async findAll(): Promise<RoomUser[]> {
    return await prisma.roomUser.findMany();
  }

  async findById(id: string): Promise<RoomUser | null> {
    const roomUser = await prisma.roomUser.findUnique({
      where: {
        id,
      },
    });

    return roomUser;
  }

  async delete(id: string): Promise<void | null> {
    const existingRoomUser = await prisma.roomUser.findUnique({
      where: {
        id,
      },
    });

    if (!existingRoomUser) return null;

    await prisma.roomUser.delete({
      where: { id },
    });
  }
}
