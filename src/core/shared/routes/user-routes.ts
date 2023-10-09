import express from "express";
import { RegisterUser } from "../../user/service/create/register-user";
import { RegisterUserController } from "../../../adapters/user/create/register-user-controller";
import { PrismaUserRepository } from "../../../external/prisma/repository/prisma-user-repository";
import { FindAllUsers } from "../../user/service/find-all/find-all-users";
import { FindAllUsersController } from "../../../adapters/user/find-all/find-all-users-controller";
import { AuthUser } from "../../user/service/auth/auth-user";
import { AuthUserController } from "../../../adapters/user/auth/auth-user-controller";

const userRoutes = express();

const userRepository = new PrismaUserRepository();

const registerUser = new RegisterUser(userRepository);
new RegisterUserController(userRoutes, registerUser);

const findAllUsers = new FindAllUsers(userRepository);
new FindAllUsersController(userRoutes, findAllUsers);

const authUser = new AuthUser(userRepository);
new AuthUserController(userRoutes, authUser);

export { userRoutes };
