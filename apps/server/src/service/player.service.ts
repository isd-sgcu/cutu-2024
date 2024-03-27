import { RedisClientType } from "redis";

export class PlayerService {
  constructor(private readonly redis?: RedisClientType) { }

  async getGame() {
    return { title: "ABC", images: [] }
  }
}