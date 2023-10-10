import { RoomRepository } from "./../../repository/room-repository";
import { UseCase } from "../../../shared/interfaces/use-case";
import { randomUUID } from "crypto";

export class CreateRoom implements UseCase<void, void> {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(): Promise<void> {
    // gerar um uuid aleatório para a sala
    const id = randomUUID();

    await this.roomRepository.create({ id });
  }
}
