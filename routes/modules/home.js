// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Times = require('../../models/times')
const User = require('../../models/user')

// 定義首頁路由
router.get('/', (req, res) => {
    const userId = req.user._id

    async function generateLeaderBoard() {
        try {
            const fullList = await Times.find()
                .lean()
                .sort({ kissTimes: 'desc' })
                .catch(error => console.error(error));

            // 在這裡使用 fullList
            const player1 = await User.find({ _id: fullList[0].userId }).lean()
            const player2 = await User.find({ _id: fullList[1].userId }).lean()
            const player3 = await User.find({ _id: fullList[2].userId }).lean()
            const player4 = await User.find({ _id: fullList[3].userId }).lean()
            const player5 = await User.find({ _id: fullList[4].userId }).lean()

            const leaderboard = [
                { name: player1[0].name, kissTimes: fullList[0].kissTimes },
                { name: player2[0].name, kissTimes: fullList[1].kissTimes },
                { name: player3[0].name, kissTimes: fullList[2].kissTimes },
                { name: player4[0].name, kissTimes: fullList[3].kissTimes },
                { name: player5[0].name, kissTimes: fullList[4].kissTimes }
            ]

            return leaderboard

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '發生錯誤' });
        }
        return leaderboard
    }

    async function main() {
        try {
            const leaderboard = await generateLeaderBoard();
            // console.log(leaderboard);

            Times.findOne({ userId })         // Restaurant.find({ userId })
                .lean()
                .then(times => res.render('index', {
                    kissTimes: times.kissTimes,
                    leaderboard1: leaderboard[0],
                    leaderboard2: leaderboard[1],
                    leaderboard3: leaderboard[2],
                    leaderboard4: leaderboard[3],
                    leaderboard5: leaderboard[4]
                }))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '發生錯誤' });
        }
    }

    main()
})


// 匯出路由模組
module.exports = router