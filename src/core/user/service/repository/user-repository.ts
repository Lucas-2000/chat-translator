import { User } from "../../model/user";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
