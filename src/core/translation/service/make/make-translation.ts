import { UseCase } from "../../../shared/interfaces/use-case";
import { UserRepository } from "../../../user/repository/user-repository";
import { translate } from "@vitalets/google-translate-api";

interface Data {
  userId: string;
  message: string;
}

export class MakeTranslation implements UseCase<Data, string> {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Data): Promise<string> {
    const { userId, message } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User not found");

    if (message.length <= 0)
      throw new Error("Message must be at least 1 character");

    const { text } = await translate(message, { to: user.language });

    return text;
  }
}
