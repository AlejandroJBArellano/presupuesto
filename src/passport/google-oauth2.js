const passport = require("passport"),
GoogleStrategy = require('passport-google-oauth20').Strategy,
User = require("../models/user");

passport.serializeUser(async (user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async(user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL,
    passReqToCallback: false
}, async (req, accessToken, refreshToken, profile, done) => {
    const validateUser = await User.findOne({ email: profile.emails[0].value })
    if(validateUser) {
        return done(null, validateUser._id)
    } {
        const newUser = new User()
        newUser.email = profile.emails[0].value
        newUser.username = profile.displayName
        newUser.profilePic = profile.photos[0].value
        newUser.budget = 0
        await newUser.save()
        console.log(newUser)
        return done(null, newUser._id)
    }
}));