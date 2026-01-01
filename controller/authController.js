
const { check, validationResult } = require('express-validator');
const User = require('../models/user_auth');
const bycrypt = require('bcryptjs');



exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        title: 'Login - StayNest',
        activePage: 'login',
        isLoggedIn: false,
        errorMessages: undefined,
        oldInput: {},
        user: null
    });
}

// Validation rules for login
exports.loginValidation = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .trim()
];

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            title: 'Login - StayNest',
            activePage: 'login',
            isLoggedIn: false,
            errorMessages: errors.array().map(err => err.msg),
            oldInput: { email },
            user: null

        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).render('auth/login', {
                    title: 'Login - StayNest',
                    activePage: 'login',
                    isLoggedIn: false,
                    errorMessages: ['User does not exist. Please sign up first.'],
                    oldInput: { email },
                    user: null
                });
            }
            
            return bycrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).render('auth/login', {
                            title: 'Login - StayNest',
                            activePage: 'login',
                            isLoggedIn: false,
                            errorMessages: ['Invalid email or password'],
                            oldInput: { email },
                            user: null
                        });
                    }
                    
                    // Store only necessary user data as plain object (not Mongoose document)
                    req.session.isLoggedIn = true;
                    req.session.user = {
                        _id: user._id.toString(),
                        fullName: user.fullName,
                        email: user.email,
                        accountType: user.accountType
                    };
                    req.session.save(err => {
                        if (err) {
                            console.log('Error saving session:', err);
                        }
                        res.redirect('/');
                    });
                });
        })
        .catch(err => {
            console.log('Error during login:', err);
            res.status(500).render('auth/login', {
                title: 'Login - StayNest',
                activePage: 'login',
                isLoggedIn: false,
                errorMessages: ['An error occurred. Please try again later.'],
                oldInput: { email },
                user: null
            });
        });
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error destroying session during logout:', err);
        }
        res.redirect('/');
    });
}

exports.getSignup = (req, res, next) => {
    res.render("auth/signup", {
        title: 'Sign Up - StayNest',
        activePage: 'signup',
        isLoggedIn: false,
        errorMessages: undefined,
        oldInput: {},
        user: null
    });
}

// Validation rules for signup
exports.signupValidation = [
    // Full name validation
    check('name')
        .notEmpty()
        .withMessage('Full Name is required')
        .isLength({ min: 3 })
        .withMessage('Full Name must be at least 3 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full Name must contain only letters and spaces')
        .trim(),
    
    // Email validation
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),

    // Password validation
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .trim(),

    // Confirm password validation
    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    // Account type validation
    check('accountType')
        .notEmpty()
        .withMessage('Please select an account type')
        .isIn(['guest', 'host'])
        .withMessage('Invalid account type selected')
];

exports.postSignup = (req, res, next) => {
    const { name, email, password, accountType } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/signup', {
            title: 'Sign Up - StayNest',
            activePage: 'signup',
            isLoggedIn: false,
            errorMessages: errors.array().map(err => err.msg),
            oldInput: { name, email, accountType },
            user: null
        });
    }

    //hash password before saving
    bycrypt.hash(password, 12).then(hashedPassword => {
        const newUser = new User({
            fullName: name,
            email: email,
            password: hashedPassword,
            accountType: accountType
        });
        return newUser.save();
    }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        console.log('Error during user signup:', err);
        res.status(500).render('auth/signup', {
            title: 'Sign Up - StayNest',
            activePage: 'signup',
            isLoggedIn: false,
            errorMessages: ['An error occurred. Please try again later.'],
            oldInput: { name, email, accountType },
            user: null
        });
    });
}

