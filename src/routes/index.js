const express = require("express"), router = express.Router(), indexController = require("../controllers/index"), isAuthenticated = require("../controllers/isAuthenticated"), passport = require("passport");

// router.post()
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    title: "Entrar", 
    successRedirect: "/home",
    failureRedirect: '/',
    passReqToCallback: true 
}),
    (req, res) => {
        return res.redirect('/home');
    }
);

router.get("/", indexController.index)
router.get("/home", isAuthenticated, indexController.home)
router.post("/lessMoney", isAuthenticated, indexController.lessMoney)
router.post("/moreMoney", isAuthenticated, indexController.moreMoney)
router.get("/logout", isAuthenticated, (req,res,next)=>{
    req.logout();
    res.redirect("/");
    next();
})
router.get("/404", indexController.errorcuatro)
router.get("*", indexController.all)

module.exports = router