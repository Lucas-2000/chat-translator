import { Nodo } from "./nodo";

export class Queue {
  front: Nodo | null;
  rear: Nodo | null;

  constructor(front: Nodo | null = null, rear: Nodo | null = null) {
    this.front = front;
    this.rear = rear;
  }

  store(data: string): void {
    const nodo = new Nodo(data, null);

    if (this.rear === null) {
      this.front = nodo;
      this.rear = nodo;
    } else {
      this.rear.link = nodo;
      this.rear = nodo;
    }
  }

  retrieve(): string | null {
    if (this.front === null) {
      this.rear = null;
      return null;
    }

    const aux = this.front.data;
    this.front = this.front.link;

    return aux;
  }

  destroy(): void {
    while (this.front !== null) {
      let aux = this.front;
      this.front = aux.link;
      aux.link = null;
      aux.data = null;
    }

    this.rear = null;
  }

  size(): number {
    let count = 0;
    let current = this.front;

    while (current !== null) {
      count++;
      current = current.link;
    }

    return count;
  }

  first(): string | null {
    if (this.front === null) {
      return null;
    }

    return this.front.data;
  }

  last(): string | null {
    if (this.rear === null) {
      return null;
    }

    return this.rear.data;
  }
}
