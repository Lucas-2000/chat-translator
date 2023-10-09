import { UserRepository } from "../../core/user/service/repository/user-repository";
import { User } from "../../core/user/model/user";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async create(user: User): Promise<User> {
    const newUser = { ...user, id: randomUUID() };
    this.users.push(newUser);
    return newUser;
  }
}
