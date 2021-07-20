
const User = require("../models/user"),
validateUser = async (req, res) => {
    if(req.user) {
        const user = await User.findById(req.user)
        if(!user){
            return res.redirect("/")
        }
    }
},
all = async (req, res, next) => {
    validateUser(req, res)
    return next(); // si no ponía el return next(), se quedaba pegado
},
index = async (req, res) => {
    try{
        const user = await User.findById(req.user)
        if(user) return res.redirect("/home")
        res.render("index", {
            title: "Crea tu Presupuesto"
        })
    } catch (e) {res.redirect("/404")}
},
home = async (req,res) => {
    try{
        validateUser(req, res)
        const user = await User.findById(req.user)
        res.render("home", {
            user: user,
            profilePic: user.profilePic,
            username: user.username,
            budget: user.budget,
            transactions: user.transactions
        })
    } catch (e) {res.redirect("/404")}
},
moreMoney = async (req, res) => {
    try{
        const user = await User.findById(req.user), cuantity = parseInt(req.body.cuantity)
        if(!user) return res.redirect("/")
        user.transactions.push({
            concept: req.body.concept,
            cuantity: cuantity,
            action: "+"
        })
        user.budget += cuantity
        await user.save()
        res.redirect("/home")
    } catch (e) {res.redirect("/404")}
},
lessMoney = async (req, res) => {
    try{
        const user = await User.findById(req.user), cuantity = parseInt(req.body.cuantity)
        if(!user) return res.redirect("/")
        user.transactions.push({
            concept: req.body.concept,
            cuantity: parseInt(req.body.cuantity),
            action: "-"
        })
        user.budget -= cuantity
        await user.save()
        res.redirect("/home")
    } catch (e) {res.redirect("/404")}
}, errorcuatro = (req, res) => {
    res.render("404")
};

module.exports = {
    all,
    index, 
    home, 
    moreMoney, 
    lessMoney,
    errorcuatro
}