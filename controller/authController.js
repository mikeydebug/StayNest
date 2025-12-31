





exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        title: 'Login - StayNest',
        activePage: 'login',
        isLoggedIn: false
    });
}

exports.postLogin = (req, res, next) => {

    
    // TODO: Add authentication logic here
    console.log('Login attempt:', req.body);

    req.session.isLoggedIn = true;
    
    // For now, just redirect to home
    res.redirect('/');
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error destroying session during logout:', err);
        }
        res.redirect('/');
    });
}