import { UseCase } from "../../../shared/interfaces/use-case";
import { User } from "../../model/user";
import { UserRepository } from "../repository/user-repository";

export class FindAllUsers implements UseCase<void, User[]> {
  constructor(readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
