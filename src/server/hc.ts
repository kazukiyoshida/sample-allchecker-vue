const Express = require('express')
import { IUserDetail } from '../interfaces/user'

const router = Express.Router()

router.get('/hc', (req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send({ hc: 'success' })
})

module.exports = router
