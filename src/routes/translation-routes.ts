import express from "express";
import { PrismaUserRepository } from "../external/prisma/repository/prisma-user-repository";
import { MakeTranslation } from "../core/translation/service/make/make-translation";
import { MakeTranslationController } from "../adapters/translation/make/make-translation-controller";

const translationRoutes = express();

const userRepository = new PrismaUserRepository();

const makeTranslation = new MakeTranslation(userRepository);
new MakeTranslationController(translationRoutes, makeTranslation);

export { translationRoutes };
