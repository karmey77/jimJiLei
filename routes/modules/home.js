// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Times = require('../../models/times')

// 定義首頁路由
router.get('/', (req, res) => {
    const userId = req.user._id
    Times.findOne({ userId })         // Restaurant.find({ userId })
        .lean()
        .then(times => res.render('index', { kissTimes: times.kissTimes }))
        .catch(error => console.error(error))
})

router.get('/ranking', (req, res) => {
    // const userId = req.user._id
    // Times.findOne({ userId })         // Restaurant.find({ userId })
    //     .lean()
    //     .then(times => res.render('index', { kissTimes: times.kissTimes }))
    //     .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router