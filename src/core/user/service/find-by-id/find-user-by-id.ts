import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";
import { UseCase } from "./../../../shared/interfaces/use-case";

type Data = {
  id: string;
};

export class FindUserById implements UseCase<Data, User | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: Data): Promise<User | null> {
    const { id } = data;

    const user = await this.userRepository.findById(id);

    if (!user) throw new Error("User not found");

    return user;
  }
}
