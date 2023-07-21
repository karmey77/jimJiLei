const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const Times = require('../models/times')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
    // 初始化 Passport 模組
    app.use(passport.initialize())
    app.use(passport.session())
    // 設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'account' , passReqToCallback: true}, (req, account, password, done) => {
        User.findOne({ account })
            .then(user => {
                if (!user) {
                    return done(null, false, req.flash('warning_msg', '此帳號尚未愛情註冊！'))
                }
                return bcrypt.compare(password, user.password).then(isMatch => {
                    if (!isMatch) {
                        return done(null, false, req.flash('warning_msg', '帳號或密碼出現愛情錯誤！'))
                    }
                    return done(null, user)
                })
            })
            .catch(err => done(err, false))
    }))

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ account: email })
            .then(user => {
                if (user) return done(null, user)
                const randomPassword = Math.random().toString(36).slice(-8)
                bcrypt
                    .genSalt(10)
                    .then(salt => bcrypt.hash(randomPassword, salt))
                    .then(hash => User.create({
                        name,
                        account: email,
                        password: hash
                    }))
                    .then(user => {
                        const userId = user._id
                        return Times.create({ kissTimes: 0, userId })
                    })
                    .then(user => done(null, user))
                    .catch(err => done(err, false))
            })
    }))


    // 設定序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, null))
    })
}