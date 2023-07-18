// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const User = require('../../models/user') 

// 定義首頁路由
router.get('/', (req, res) => {

    res.render('index')
    // const userId = req.user._id
    // User.find()         // Restaurant.find({ userId })
    // .lean()
    // .sort({ _id: 'asc' })
    // .then(restaurant => res.render('index', { restaurant }))
    // .catch(error => console.error(error))
    // // res.render('index')
})

// 匯出路由模組
module.exports = router