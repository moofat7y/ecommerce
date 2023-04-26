const router = require("express").Router();
const authCtrl = require("../controller/authCtrl");
const User = require("../models/userModel");
const { body } = require("express-validator");
const { isAuth } = require("../middlewares/isAuth");
// Put new user account
router.put(
  "/signup",
  [
    body("firstname", "firstname must be at least 3 chracter length")
      .trim()
      .isAlpha()
      .isLength({ min: 3, max: 10 }),
    body("lastname", "lastname must be at least 3 chracter length")
      .trim()
      .isAlpha()
      .isLength({ min: 3, max: 10 }),

    body("mobile")
      .trim()
      .isNumeric()
      .withMessage("Mobile number must be only a numbers"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value, { req }) => {
        const isEmailExistBefore = await User.findOne({ email: value });
        if (isEmailExistBefore) {
          return Promise.reject("This email already used");
        }
      }),
    body(
      "password",
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 6 , max 20 char long"
    )
      .trim()
      .isLength({ min: 6 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  authCtrl.signUp
);

// Confirm email
router.post("/confirm-email/:token", authCtrl.confirmEmail);

// Signin
router.post("/signin", authCtrl.signIn);

// Admin Signin
router.post("/admin-signin", authCtrl.adminSignIn);

// Forgot password
router.post(
  "/forgot-password",
  body("email", "Please enter a valid email").exists().notEmpty().trim(),
  authCtrl.forgotPassword
);

// Reset password
router.patch(
  "/reset-password/:token",
  body("password", "Please enter a valid password").exists().notEmpty().trim(),
  authCtrl.resetPassword
);

// Get status
router.get("/status", isAuth, authCtrl.getUserStatus);

// admin Logout
router.get("/logout", authCtrl.logOut);
// user logout
router.get("/logout-user", authCtrl.userLogOut);

// Handle refresh token user
router.get("/refresh-user", authCtrl.handleRefreshTokenUser);

// Handle refresh token admin
router.get("/refresh", authCtrl.handleRefreshToken);

module.exports = router;
