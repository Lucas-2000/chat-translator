export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
}
