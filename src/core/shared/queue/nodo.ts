export class Nodo {
  data: string | null;
  link: Nodo | null;

  constructor(data: string | null = null, link: Nodo | null = null) {
    this.data = data;
    this.link = link;
  }
}
