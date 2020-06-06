import {_request} from './request_y';
import {responseIntercept} from './response';

class statisticApi extends _request{
  constructor() {
    super()
  }

  @responseIntercept()
  async getLong(data) {
    console.log('我执行了')
    return super.post('/statistic/searchStatistic', data)
  }
}

export const statisticMol = new statisticApi()
