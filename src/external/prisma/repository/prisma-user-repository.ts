import { PrismaClient } from "@prisma/client";
import { User } from "../../../core/user/model/user";
import { UserRepository } from "../../../core/user/repository/user-repository";
import { prisma } from "../../../core/shared/config/prismaClient";

export class PrismaUserRepository implements UserRepository {
  findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  create(user: User): Promise<User> {
    return prisma.user.create({
      data: user,
    });
  }
}
