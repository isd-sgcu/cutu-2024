

import { Client, ClientRepository } from '$/models/client.model'
import { GameRepository } from '$/models/game.model'

export class PlayerService {
  constructor(private readonly gameRepository: GameRepository, private readonly clientRepository: ClientRepository) { }

  async getGame(id: string) {
    return await this.gameRepository.getGameById(id).catch((err) => ({ err }))
  }

  async getState() {
    const games = await this.gameRepository.getState()
    return games
  }

  async getMyID(ipAddr?: string, cid?: string, sid?: string) {
    return this.clientRepository.searchPlayer({ ipAddr, cid, sid })
  }

  async register(name: string, fid: string, sid: string, ipAddr?: string) {
    const cid = crypto.randomUUID();
    if (await this.clientRepository.searchPlayer({ fid })) {
      throw Error('BREACH!');
    }
    const client = new Client({ cid, ipAddr, fid, sid, isSuspended: false, name })
    return await client.save()
  }

  async login(cid: string, fid: string, sid: string) {
    return this.clientRepository.updateSID(cid, fid, sid)
  }
}
