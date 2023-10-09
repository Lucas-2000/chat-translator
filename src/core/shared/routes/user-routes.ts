import express from "express";
import { RegisterUser } from "../../user/service/create/register-user";
import { RegisterUserController } from "../../../adapters/user/create/register-user-controller";
import { PrismaUserRepository } from "../../../external/prisma/prisma-user-repository";
import { FindAllUsers } from "../../user/service/find-all/find-all-users";
import { FindAllUsersController } from "../../../adapters/user/find-all/find-all-users-controller";

const userRoutes = express();

const userRepository = new PrismaUserRepository();

const registerUser = new RegisterUser(userRepository);
new RegisterUserController(userRoutes, registerUser);

const findAllUsers = new FindAllUsers(userRepository);
new FindAllUsersController(userRoutes, findAllUsers);

export { userRoutes };
