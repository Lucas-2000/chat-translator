import { PrismaClient } from "@prisma/client";
import { User } from "../../../core/user/model/user";
import { UserRepository } from "../../../core/user/repository/user-repository";
import { prisma } from "../../../core/shared/config/prismaClient";

export class PrismaUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  async update(user: User): Promise<User | null> {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) return null;

    return await prisma.user.update({
      data: user,
      where: {
        id: user.id,
      },
    });
  }

  async delete(id: string): Promise<void | null> {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) return null;

    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
