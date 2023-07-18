// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// const { authenticator } = require('../middleware/auth')  // 掛載 middleware
const home = require('./modules/home') // 引入 home 模組程式碼
// const users = require('./modules/users')
// const restaurants = require('./modules/restaurants') // 引入 restaurants 模組程式碼
// const sort = require('./modules/sort')
// const search = require('./modules/search') // 引入 search 模組程式碼
// const auth = require('./modules/auth')

// router.use('/users', users)
// router.use('/auth', auth)
// router.use('/search', authenticator, search)
// router.use('/sort', authenticator, sort)
// router.use('/restaurants', authenticator, restaurants) // 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組
router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組

// 匯出路由器
module.exports = router