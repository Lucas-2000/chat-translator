import { DestroyQueueController } from "./../adapters/queue/destroy/destroy-queue-controller";
import express from "express";
import { JoinQueue } from "../core/queue/service/join/join-queue";
import { JoinQueueController } from "../adapters/queue/join/join-queue-controller";
import { queueInstance } from "../core/shared/queue/queue-instance";
import { ViewQueue } from "../core/queue/service/view/view-queue";
import { ViewQueueController } from "../adapters/queue/view/view-queue-controller";
import { PrismaUserRepository } from "../external/prisma/repository/prisma-user-repository";
import { DestroyQueue } from "../core/queue/service/destroy/destroy-queue";

const queueRoutes = express();

const userRepository = new PrismaUserRepository();

const joinQueue = new JoinQueue(queueInstance, userRepository);
new JoinQueueController(queueRoutes, joinQueue);

const viewQueue = new ViewQueue(queueInstance);
new ViewQueueController(queueRoutes, viewQueue);

const destroyQueue = new DestroyQueue(queueInstance);
new DestroyQueueController(queueRoutes, destroyQueue);

export { queueRoutes };
