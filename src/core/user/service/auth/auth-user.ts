import { compare } from "bcrypt";
import { UseCase } from "../../../shared/interfaces/use-case";
import { User } from "../../model/user";
import { UserRepository } from "../../repository/user-repository";
import { jwtSecret } from "../../../shared/config/jwtConfig";
import { sign } from "jsonwebtoken";

type Data = {
  username: string;
  password: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export class AuthUser implements UseCase<Data, AuthResponse> {
  constructor(readonly userRepository: UserRepository) {}

  async execute({ username, password }: Data): Promise<AuthResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new Error("Username or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Username or password incorrect");

    if (!jwtSecret) throw new Error("JWT Key not found!");

    const token = sign({}, jwtSecret, {
      subject: user.id,
      expiresIn: "12h",
    });

    return { user, token };
  }
}
