import {_request, differentMethods} from './request_y';
import {Response} from './response';

class statisticApi extends differentMethods{
  constructor() {
    super()
  }

  //根据时间查询数据
  async getLong(data) {
    return Response(await this.post('/statistic/searchStatistic', data))
  }

  //查询统计总数居
  async getTotal() {
    return Response(await this.get('/statistic/searchStatistic'))
  }
}

export const statisticMol = new statisticApi()
