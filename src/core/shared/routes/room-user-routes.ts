import express from "express";
import { CreateRoomUser } from "../../room-user/service/create/create-room-user";
import { PrismaUserRepository } from "../../../external/prisma/repository/prisma-user-repository";
import { PrismaRoomRepository } from "../../../external/prisma/repository/prisma-room-repository";
import { PrismaRoomUserRepository } from "../../../external/prisma/repository/prisma-room-user-repository";
import { CreateRoomUserController } from "../../../adapters/room-user/create/create-room-user-controller";
import { FindAllRoomUsers } from "../../room-user/service/find-all/find-all-room-users";
import { FindAllRoomUsersController } from "../../../adapters/room-user/find-all/find-all-room-users-controller";
import { DeleteRoomUser } from "../../room-user/service/delete/delete-room-user";
import { DeleteRoomUserController } from "../../../adapters/room-user/delete/delete-room-user-controller";

const roomUserRoutes = express();

const userRepository = new PrismaUserRepository();
const roomRepository = new PrismaRoomRepository();
const roomUserRepository = new PrismaRoomUserRepository();

const createRoomUser = new CreateRoomUser(
  roomUserRepository,
  roomRepository,
  userRepository
);
new CreateRoomUserController(roomUserRoutes, createRoomUser);

const findAllRoomUsers = new FindAllRoomUsers(roomUserRepository);
new FindAllRoomUsersController(roomUserRoutes, findAllRoomUsers);

const deleteRoomUser = new DeleteRoomUser(roomUserRepository);
new DeleteRoomUserController(roomUserRoutes, deleteRoomUser);

export { roomUserRoutes };
