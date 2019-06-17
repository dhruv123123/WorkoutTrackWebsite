exports.ErrorPage = (req,res,next)=>{
    res.status(404).render("Error",{pageTitle: "Page not found"});
}