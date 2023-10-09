import { UserRepository } from "../repository/user-repository";
import { UseCase } from "../../../shared/interfaces/use-case";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

type Data = {
  name: string;
  username: string;
  email: string;
  password: string;
  language: string;
};

export class RegisterUser implements UseCase<Data, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: Data): Promise<void> {
    const { name, username, email, password, language } = data;

    // gerar um uuid aleatório para o usuário
    const id = randomUUID();

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists) throw new Error(`User ${username} already exists`);

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) throw new Error(`Email ${email} already exists`);

    if (password.length < 7)
      throw new Error("Password must be at least 8 characters");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await this.userRepository.create({
      id,
      name,
      username,
      email,
      password: hashedPassword,
      language,
    });
  }
}
