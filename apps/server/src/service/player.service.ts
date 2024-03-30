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
    const game = await this.gameRepository.getLastActiveGame()
    if (game && game.id && game.status === 'playing') {
      return await this.gameHistoryRepository.createHistory(game.id, client.id, action, vote)
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

  async getScoreboard() {
    const game = await this.gameRepository.getLastActiveGame()
    if (game?.id && game.status === 'playing') {
      return this.gameHistoryRepository
        .summaryGame(game.id)
        .then((score) =>
          score?.map((s) => `${s.key} ${s.vote}`).join(' '),
        )
    }
    return undefined
  }
}
