import { UseCase } from "../../../shared/interfaces/use-case";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";
import bcrypt from "bcrypt";

type Data = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  language: string;
};

export class UpdateUser implements UseCase<Data, User | null> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: Data): Promise<User | null> {
    const { id, name, username, email, password, language } = data;

    const user = await this.userRepository.findById(id);

    if (!user) throw new Error("User not found");

    if (password.length < 7)
      throw new Error("Password must be at least 8 characters");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await this.userRepository.update({
      id,
      name,
      username,
      email,
      password: hashedPassword,
      language,
    });

    return data;
  }
}
