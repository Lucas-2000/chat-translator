import express from "express";
import { PrismaUserRepository } from "../external/prisma/repository/prisma-user-repository";
import { RegisterUser } from "../core/user/service/create/register-user";
import { RegisterUserController } from "../adapters/user/create/register-user-controller";
import { FindAllUsers } from "../core/user/service/find-all/find-all-users";
import { FindAllUsersController } from "../adapters/user/find-all/find-all-users-controller";
import { AuthUser } from "../core/user/service/auth/auth-user";
import { AuthUserController } from "../adapters/user/auth/auth-user-controller";
import { UpdateUser } from "../core/user/service/update/update-user";
import { UpdateUserController } from "../adapters/user/update/update-user-controller";
import { FindUserById } from "../core/user/service/find-by-id/find-user-by-id";
import { FindUserByIdController } from "../adapters/user/find-by-id/find-user-by-id-controller";
import { DeleteUser } from "../core/user/service/delete/delete-user";
import { DeleteUserController } from "../adapters/user/delete/delete-user-controller";

const userRoutes = express();

const userRepository = new PrismaUserRepository();

const registerUser = new RegisterUser(userRepository);
new RegisterUserController(userRoutes, registerUser);

const findAllUsers = new FindAllUsers(userRepository);
new FindAllUsersController(userRoutes, findAllUsers);

const authUser = new AuthUser(userRepository);
new AuthUserController(userRoutes, authUser);

const updateUser = new UpdateUser(userRepository);
new UpdateUserController(userRoutes, updateUser);

const findUserById = new FindUserById(userRepository);
new FindUserByIdController(userRoutes, findUserById);

const deleteUser = new DeleteUser(userRepository);
new DeleteUserController(userRoutes, deleteUser);

export { userRoutes };
