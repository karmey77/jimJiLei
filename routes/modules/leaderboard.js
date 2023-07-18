// 假設您使用 Express 框架
const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const Times = require('../../models/times')

// 假設您的排行榜數據存儲在一個名為 leaderboard 的陣列中
// const leaderboard = [
//     { name: '玩家1', kissTimes: 100 },
//     { name: '玩家2', kissTimes: 90 },
//     { name: '玩家3', kissTimes: 80 },
//     { name: '玩家4', kissTimes: 70 },
//     { name: '玩家5', kissTimes: 60 }
// ]

// 設定 /leaderboard 路由，將排行榜數據作為 JSON 回應
router.get('/', (req, res) => {
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
            console.log(leaderboard);
            res.json(leaderboard)

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '發生錯誤' });
        }
    }

    main()
});

module.exports = router