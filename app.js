const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const csvParser = require('csv-parse');
const path = require('path');
const sequelize = require("./Util/sequalize");

const showErrorPage = require('./Controller/error');
const product = require("./models/product");
const user = require("./models/user");
app.use(bodyParser.urlencoded({extented:false}));



app.set('view engine','ejs');
app.set('views','views');
app.set('views', path.join(__dirname, 'views'));


sequelize.sync().then(result =>{
        console.log("Success");
}).catch(err=>{
    console.log("Error in connection mysql");
});





app.get("/",(req,res)=>{
    res.send("Hello")
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
    user.findAll({
        where:{
            email:email,
            password: password
        }
    })
    .then(users=>{
        console.log(users)
    })
    .catch(err=>{
        console.log(err);
    })
})


app.use(showErrorPage.ErrorPage);
app.listen(3000);