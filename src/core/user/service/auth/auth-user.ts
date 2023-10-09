import { compare } from "bcrypt";
import { UseCase } from "../../../shared/interfaces/use-case";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";

type Data = {
  username: string;
  password: string;
};

export class AuthUser implements UseCase<Data, User> {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ username, password }: Data): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new Error("Username or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Username or password incorrect");

    return user;
  }
}
