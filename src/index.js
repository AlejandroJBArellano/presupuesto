// npm modules
require("dotenv").config()
const express = require("express"), helmet = require("helmet"), path = require("path"), router = require("./routes/index"), passport = require("passport"), session = require("express-session"),

// 1) Settings 

app = express();
require("./database")
require("./passport/google-oauth2")

app.set("port", process.env.PORT || 5000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// 2) Middleweares
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({ //objeto como configuración de esta sesión
    secret: "interface-calculate", //especie de texto secreto para poerd estar seguro *nombre aleatorio
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());  

// 3) routes
app.use(router)

// 4) Errores

// 5) Static Files
app.use(express.static(path.join(__dirname, "public")))

// 6) Start the server
app.listen(app.get("port"), _=>console.log(`server on port ${app.get("port")}`));