

import { Client, ClientRepository } from '$/models/client.model'
import { GameRepository } from '$/models/game.model'

export class PlayerService {
  constructor(private readonly gameRepository: GameRepository, private readonly clientRepository: ClientRepository) { }

  async getGame(id: string) {
    return await this.gameRepository.getGameById(id).catch((err) => ({ err }))
  }

  async getState() {
    const games = await this.gameRepository.getActiveGame()
    return games?.open === true ? 'playing' : 'waiting'
  }

  async getLastGame() {
    return this.gameRepository.getLastActiveGame()
  }

  async submit(client: Client, action: string, vote: number) {
    const game = await this.gameRepository.getActiveGame()
    if (game?.id) {
      return this.gameRepository.createHistory(game.id, client.id, action, vote)
    }
    throw Error('NO GAME ON')

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

  async getScoreboard() {
    const game = await this.gameRepository.getActiveGame()
    if (game?.id) {
      return this.gameRepository.calculateVotes(game.id)
    }
    throw Error('NO GAME ON')
  }

  async login(cid: string, fid: string, sid: string) {
    const updated = await this.clientRepository.updateSID(cid, fid, sid)
    return updated
  }
}
