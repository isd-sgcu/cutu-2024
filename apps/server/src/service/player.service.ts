import { Client, ClientRepository } from '$/models/client.model'
import { GameRepository } from '$/models/game.model'
import { GameHistoryRepository } from '$/models/history.model'
import { createLogger } from '$/utils/logger'

export class PlayerService {
  logger = createLogger('PlayerService')
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly clientRepository: ClientRepository,
    private readonly gameHistoryRepository: GameHistoryRepository,
  ) { }

  async getGame(id: string) {
    return await this.gameRepository.getGameById(id).catch((err) => ({ err }))
  }

  async getGameState() {
    return this.gameRepository.getLastActiveGame()
  }

  async submit(client: Client, action: string, vote: number) {
    const game = await this.gameHistoryRepository.getLastActiveGame()
    if (game && game.id && game.status === 'playing') {
      await this.gameHistoryRepository.createHistory(
        game.id,
        client.id,
        action,
        vote,
      )
      return game
    }
    throw Error('No game is playing')
  }

  async getMyID(ipAddr?: string, cid?: string, sid?: string) {
    return this.clientRepository.searchPlayer({ ipAddr, cid, sid })
  }

  async register(name: string, fid: string, sid: string, ipAddr?: string) {
    const cid = crypto.randomUUID()

    if (await this.clientRepository.searchPlayer({ fid })) {
      throw Error(`FID ${fid} already used`)
    }

    const client = new Client({
      cid,
      ipAddr,
      fid,
      sid,
      isSuspended: false,
      name,
    })
    return await client.save()
  }

  async login(cid: string, fid: string, sid: string) {
    return await this.clientRepository
      .updateSID(cid, fid, sid)
      .then((aff) => {
        if (aff[0] === 1) {
          return aff[1][0]
        }
        throw new Error(`User not found with CID:${cid} FID:${fid}`)
      })
      .catch((err) => {
        this.logger.warn(err)
        throw new Error('Bad CID Authentication')
      })
  }

  async getScreenState() {
    return await this.gameHistoryRepository.getScreenState()
  }

  async getScoreboard(game_id: string, game_keys: string[]) {
    return this.gameHistoryRepository
      .summaryGame(game_id, game_keys)
      .then((score) => {
        const total_vote = score.reduce((acc, s) => acc + s.vote, 0)
        if (total_vote === 0) {
          return score.map((s) => `${s.key} ${(100 / score.length).toFixed(2)}`).join(' ')
        }
        return score?.map((s) => `${s.key} ${(s.vote / total_vote * 100).toFixed(2)}`).join(' ')
      })
  }
}
