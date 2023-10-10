import { UserRepository } from "../../core/user/repository/user-repository";
import { User } from "../../core/user/model/user";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
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

  async update(user: User): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return null;
    }

    this.users[index] = { ...this.users[index], ...user };

    return this.users[index];
  }

  async delete(id: string): Promise<void | null> {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      return null;
    }

    this.users.splice(index, 1);
  }
}
