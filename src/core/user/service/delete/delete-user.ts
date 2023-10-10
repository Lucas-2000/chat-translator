import { UseCase } from "../../../shared/interfaces/use-case";
import { UserRepository } from "../../repository/user-repository";

type Data = {
  id: string;
};

export class DeleteUser implements UseCase<Data, void | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: Data): Promise<void | null> {
    const { id } = data;

    const user = await this.userRepository.findById(id);

    if (!user) throw new Error("User not found");

    await this.userRepository.delete(id);
  }
}
