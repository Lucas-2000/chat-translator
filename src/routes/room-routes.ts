import express from "express";
import { PrismaRoomRepository } from "../../../external/prisma/repository/prisma-room-repository";
import { CreateRoom } from "../../room/service/create/create-room";
import { CreateRoomController } from "../../../adapters/room/create/create-room-controller";
import { FindAllRooms } from "../../room/service/find-all/find-all-rooms";
import { FindAllRoomsController } from "../../../adapters/room/find-all/find-all-rooms-controller";
import { DeleteRoom } from "../../room/service/delete/delete-room";
import { DeleteRoomController } from "../../../adapters/room/delete/delete-room-controller";

const roomRoutes = express();

const roomRepository = new PrismaRoomRepository();

const createRoom = new CreateRoom(roomRepository);
new CreateRoomController(roomRoutes, createRoom);

const findAllRooms = new FindAllRooms(roomRepository);
new FindAllRoomsController(roomRoutes, findAllRooms);

const deleteRoom = new DeleteRoom(roomRepository);
new DeleteRoomController(roomRoutes, deleteRoom);

export { roomRoutes };
