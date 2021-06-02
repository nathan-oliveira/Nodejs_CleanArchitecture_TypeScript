import { LastRankingLoader } from '@/domain/usecases'
import { Controller, HttpResponse, serverError, ok } from '@/presentation/contracts'
import { RankingScoreViewModel } from '@/presentation/view-models'

export class LoadLastRankingController implements Controller {
  constructor (private readonly lastRankingLoader: LastRankingLoader) {}

  async handle (): Promise<HttpResponse<RankingScoreViewModel[]>> {
    try {
      const ranking = await this.lastRankingLoader.load()
      const viewModels = ranking.map((item) => ({ ...item, matchDate: item.matchDate.toISOString() }))
      return ok(viewModels)
    } catch (err) {
      return serverError(err)
    }
  }
}
// 1:27:49 => https://www.youtube.com/watch?v=P0gpCCA8ZPs
