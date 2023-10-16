import express from "express";
import { PrismaUserRepository } from "../external/prisma/repository/prisma-user-repository";
import { PrismaRoomRepository } from "../external/prisma/repository/prisma-room-repository";
import { PrismaRoomUserRepository } from "../external/prisma/repository/prisma-room-user-repository";
import { CreateRoomUser } from "../core/room-user/service/create/create-room-user";
import { CreateRoomUserController } from "../adapters/room-user/create/create-room-user-controller";
import { FindAllRoomUsers } from "../core/room-user/service/find-all/find-all-room-users";
import { FindAllRoomUsersController } from "../adapters/room-user/find-all/find-all-room-users-controller";
import { DeleteRoomUser } from "../core/room-user/service/delete/delete-room-user";
import { DeleteRoomUserController } from "../adapters/room-user/delete/delete-room-user-controller";
import { queueInstance } from "../core/shared/queue/queue-instance";

const roomUserRoutes = express();

const userRepository = new PrismaUserRepository();
const roomRepository = new PrismaRoomRepository();
const roomUserRepository = new PrismaRoomUserRepository();

const createRoomUser = new CreateRoomUser(
  roomUserRepository,
  roomRepository,
  userRepository,
  queueInstance
);
new CreateRoomUserController(roomUserRoutes, createRoomUser);

const findAllRoomUsers = new FindAllRoomUsers(roomUserRepository);
new FindAllRoomUsersController(roomUserRoutes, findAllRoomUsers);

const deleteRoomUser = new DeleteRoomUser(roomUserRepository);
new DeleteRoomUserController(roomUserRoutes, deleteRoomUser);

export { roomUserRoutes };
