// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// const Restaurant = require('../../models/Restaurant') // 引用 Todo model

// 定義首頁路由
// index
router.get('/', (req, res) => {

    res.render('index')
    // const userId = req.user._id
    // Restaurant.find({ userId })         // 加入查詢條件
    // .lean()
    // .sort({ _id: 'asc' })
    // .then(restaurant => res.render('index', { restaurant }))
    // .catch(error => console.error(error))
    // // res.render('index')
})

// 匯出路由模組
module.exports = router