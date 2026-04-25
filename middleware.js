module.exports.isLogedin=(req,res,next)=>{
    if(!req.isAuthenticated()) {
      req.session.redirectUrl=req.originalUrl;
    req.flash("error", "You must be logged in to add new Property");
    return res.redirect("/login");
    next();
  }
}