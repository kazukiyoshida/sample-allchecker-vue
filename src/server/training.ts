import {
ITrainingMenu
} from '../interfaces/menu'
const _ = require('lodash')

const Express = require('express')
const router = Express.Router()

router.get('/training', (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')

  // かなり雑ですが、ランダムな長さのトレーニングメニューを返すようにします.
  const allMenu = [upper, bottom, arm, others]
  const randomLength = Math.floor( Math.random() * allMenu.length );
  const randomMenu = _.shuffle(allMenu).slice(0, randomLength)
  res.send({ menu: randomMenu })
})


// サンプルデータ
const upper: ITrainingMenu = {
  bodyPartsName: '上半身',
  muscles: ['僧帽筋', '三角筋', '胸筋']
}

const bottom: ITrainingMenu = {
  bodyPartsName: '下半身',
  muscles: ['大臀筋', '大腿四頭筋', 'ハムストリング', 'ふくらはぎ']
}

const arm: ITrainingMenu = {
  bodyPartsName: '腕',
  muscles: ['二頭', '三頭']
}

const others: ITrainingMenu = {
  bodyPartsName: 'その他',
  muscles: ['腹筋', '腹斜筋', '広背筋']
}


module.exports = router
