const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const showErrorPage = require('./Controller/error');
const user = require("./models/user");
const Sequelize = require("sequelize");
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const sequelize = new Sequelize('practiseapp','root','Current-Root-Password',{
    dialect:'mysql',
    host:'localhost',
});

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});


app.use(bodyParser.urlencoded({extented:false}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store: sequelizeSessionStore,
    saveUninitialized: true
}))


app.set('view engine','ejs');
app.set('views','views');
app.set('views', path.join(__dirname, 'views'));


sequelize.sync().then(result =>{
        console.log("Success");
}).catch(err=>{
    console.log("Error in connection mysql");
});


let isAuth = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/signup')
    }
    else{
        next();
    }
}


app.get("/",(req,res)=>{
    res.redirect("/signup")
})

app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.post("/signup",(req,res)=>{
    const userName = req.body.userName;
    const inputEmail = req.body.inputEmail
    const inputPassword = req.body.inputPassword
    const isAdmin = req.body.isAdmin;
    user.create({
        userName: userName,
        email: inputEmail,
        password : inputPassword,
        isAdmin : isAdmin
    })
    res.redirect("/login");
})

app.get("/login",(req,res,next)=>{
    res.render("login")
})

app.post("/login",(req,res,next)=>{
    const email = req.body.inputEmail
    const password = req.body.inputPassword
    user.findOne({
        where:{
            email:email,
            password: password
        }
    })
    .then(user=>{
        if (user==null){
            res.render('./login')
        }
        else{
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save();
            res.redirect('/home')
        }
    })
    .catch(err=>{
        console.log(err);
    })
})


app.get('/home',isAuth,function(req,res,next){
    res.render('./homepage')
})

app.get('/logout',function(req,res,next){
    req.session.destroy(err=>{
        console.log(err)
        res.redirect('/signup')
    });
    
})


app.use(showErrorPage.ErrorPage);
app.listen(3000);