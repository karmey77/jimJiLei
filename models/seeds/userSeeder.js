if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const User = require('../user')
const Times = require('../times')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USERS = [{
    name: '子民A',
    account: 'user1@example.com',
    password: '1'
}, {
    name: '子民B',
    account: 'user2@example.com',
    password: '1'
}]

db.once('open', () => {
    SEED_USERS.forEach(SEED_USER => {
        bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER.password, salt))
            .then(hash => User.create({
                name: SEED_USER.name,
                account: SEED_USER.account,
                password: hash
            }))
            .then(user => {
                const userId = user._id
                return Promise.all(Array.from(
                    { length: 1 },
                    (_, i) => Times.create({ kissTimes: 0, userId })
                ))
            })
            .then(() => {
                console.log('done.')
                process.exit()
            })
    })
})