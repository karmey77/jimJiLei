const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const Times = require('../../models/times')

// POST /update-kiss-count 路由處理函式
router.post('/', async (req, res) => {
    try {
        const kissCount = req.body.kissCount
        // 更新用戶的點擊次數
        const userId = req.user._id

        const times = await Times.findOne({ userId })
        times.kissTimes = kissCount;
        await times.save();

        res.status(200).json({ message: '點擊次數已更新' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '發生錯誤，無法更新點擊次數' });
    }
});

module.exports = router
