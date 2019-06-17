const express = require("express");

const router = express.Router();

const users = []

router.get("/login",(req,res)=>{
    res.send("Login Page");
});

router.post("/login",(req,res)=>{
    console.log("Login post");
});

exports.routes = router;
exports.users = users;