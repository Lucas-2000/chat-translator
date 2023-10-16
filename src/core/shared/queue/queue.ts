import { Nodo } from "./nodo";
import { Redis } from "ioredis";

const redis = new Redis();
const usersQueue = "usersQueue";

export class Queue {
  front: Nodo | null;
  rear: Nodo | null;

  constructor(front: Nodo | null = null, rear: Nodo | null = null) {
    this.front = front;
    this.rear = rear;
  }

  async store(data: string): Promise<void> {
    try {
      const nodo = new Nodo(data, null);
      const dataToStore = JSON.stringify(nodo);

      if (this.rear === null) {
        this.front = nodo;
        this.rear = nodo;
        await redis.rpush(usersQueue, dataToStore);
      } else {
        this.rear.link = nodo;
        this.rear = nodo;
        await redis.rpush(usersQueue, dataToStore);
      }
    } catch (error) {
      throw new Error("Error on store");
    }
  }

  async retrieve(): Promise<string | null> {
    try {
      const dataFromQueue = await redis.lpop(usersQueue);

      if (dataFromQueue) {
        const nodo = JSON.parse(dataFromQueue);
        const aux = nodo.data;
        this.front = nodo.link;
        return aux;
      } else {
        this.front = null;
        this.rear = null;
        return null;
      }
    } catch (error) {
      throw new Error("Error on retrieve");
    }
  }

  async destroy(): Promise<void> {
    while (this.front !== null) {
      let aux = this.front;
      this.front = aux.link;
      aux.link = null;
      aux.data = null;
    }

    this.rear = null;
    await redis.del(usersQueue);
  }

  async getQueue(): Promise<string[]> {
    try {
      const values = await redis.lrange(usersQueue, 0, -1);
      return values.map((value) => JSON.parse(value));
    } catch (error) {
      throw new Error("Error on get queue");
    }
  }

  async isUserInQueue(userId: string): Promise<boolean> {
    const queue = await redis.lrange(usersQueue, 0, -1);

    const userIdsInQueue = queue.map((item) => {
      const parsedItem = JSON.parse(item);
      return parsedItem.data;
    });

    return userIdsInQueue.includes(userId);
  }

  size(): number {
    let count = 0;
    let current = this.front;

    while (current !== null) {
      count++;
      current = current.link;
    }

    return count;
  }

  first(): string | null {
    if (this.front === null) {
      return null;
    }

    return this.front.data;
  }

  last(): string | null {
    if (this.rear === null) {
      return null;
    }

    return this.rear.data;
  }
}
