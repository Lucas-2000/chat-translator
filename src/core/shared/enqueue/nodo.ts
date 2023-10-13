import { User } from "./../../user/model/user";

export class Nodo {
  data: User | null;
  link: Nodo | null;

  constructor(data: User | null = null, link: Nodo | null = null) {
    this.data = data;
    this.link = link;
  }
}
