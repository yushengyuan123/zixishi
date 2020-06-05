import {_request} from './request_y';

class statisticApi extends _request{
  constructor() {
    super()
  }
  @test
  async getLong(data) {
    console.log('我执行了')
    return super.post('/statistic/searchStatistic', data)
  }
}

function test() {
  console.log('nihao')
}

export const statisticMol = new statisticApi()
