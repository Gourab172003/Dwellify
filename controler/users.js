
module.exports.renderSignup=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res, next) => {  
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);  // ✅ now 'next' is defined
            }
            req.flash("success", "Welcome to Dwellify!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");  // ✅ proper redirect
    }
};

module.exports.renderLogin=(req,res)=>{
        res.render("users/login.ejs");
    };


    module.exports.Login=async(req,res)=>{
        req.flash("success", "Welcome back to Wanderlust");
        res.redirect(res.locals.redirectUrl || "/listings");
    };


    module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are loged out");
        res.redirect("/listings");

    })
};