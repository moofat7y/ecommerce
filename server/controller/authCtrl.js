const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const {
  generateToken,
  generateRefreshToken,
  generateConfirmEmail,
} = require("../config/jwTokens");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Cart = require("../models/cartModel");
const crypto = require("crypto");
// Make a new user account
exports.signUp = async (req, res, next) => {
  const { firstname, lastname, email, mobile, password } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    // Create user account after validate all data
    const user = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password,
      expireAt: Date.now() + 9000000,
    });

    // generate token for confirming email
    const token = generateConfirmEmail(user._id, user.email);
    const confirmationMSG = `
    <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_3113153394752713280mdv2rw">
      <img 
        style="object-fit:cover"
        src="https://www.csc.gov.sg/images/default-source/ethos-images/ethos-digital-edition-(aug-2021)/role-of-govt-in-ecommerce_banner-teaser.jpg" 
        width="120" 
        height="80" 
        aria-hidden="true" 
        style="margin-bottom:16px" 
        alt="E-commerce" 
        class="CToWUd" 
        data-bit="iit">
      <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
        <div style="font-size:24px">
          Confirm your email
        </div>
        <a style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${user.email}</a>
      </div>
      <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">
        You are signed up in E-commerce please confirm your email to signin
        <div style="padding-top:32px;text-align:center">
          <a href="${process.env.CLIENT_URL}/confirm-email/${token}/" style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:16px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline-block;padding:10px 24px;background-color: #003e29;border-radius:5px;min-width:90px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Dmohammedbelal802@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1602519112000?rfn%253D31%2526rfnc%253D1%2526eid%253D7075151940979537584%2526et%253D0%2526anexp%253D-control&amp;source=gmail&amp;ust=1680450201522000&amp;usg=AOvVaw2lPxF5ZwXRffazLR8nc5Fd">Confirm</a>
        </div>
      </div>
    </div>
    `;

    const data = {
      to: user.email,
      text: `HI ${email}`,
      subject: "confirm your email",
      html: confirmationMSG,
    };
    sendEmail(data);

    res.status(201).json({ message: "شكرا للك! لقد تم انشاء حسابك بنجاح" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Confirm email
exports.confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decodedToken = jwt.verify(token, process.env.CONFIRM_TOKEN);
    const user = await User.findOne({
      _id: decodedToken.id,
      email: decodedToken.email,
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.emailconfirmed) {
      const error = new Error("This email already confirmed");
      error.statusCode = 422;
      throw error;
    }
    user.emailconfirmed = true;
    user.expireAt = undefined;
    await user.save();
    await Cart.create({ user: user._id });

    res.status(200).json({ message: "لقد تم تاكيد حسابك بنجاح" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// User signin
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error(
        `${email} لا يملك حسابا. قم بانشاء حساب اولا او استخدم عنوان اخر`
      );
      error.statusCode = 404;
      throw error;
    }
    // if (!user.emailconfirmed) {
    //   const error = new Error("يجب تاكيد حسابك اولا");
    //   error.statusCode = 422;
    //   throw error;
    // }
    const isPassCorrect = await user.isPasswordMatch(password);
    if (!isPassCorrect) {
      const error = new Error("كلمة المرور خاطئه");
      error.statusCode = 403;
      throw error;
    }
    // Generate user token
    const userToken = generateToken(user._id);
    // Generate refresh token
    const refreshToken = generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 72 * 60 * 60 * 1000,
      secure: true,
      httpOnly: false,
      sameSite: "None",
      // domin: "http://localhost:5174/",
    });

    const { password: a, refreshToken: b, ...other } = user._doc;
    res.status(200).json({
      token: userToken,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get user status after signin
exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const { password, createdAt, updatedAt, expireAt, isBlocked, ...other } =
      user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Admin signin
exports.adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error(
        `${email} does not have an account. Try a different email or sign up.`
      );
      error.statusCode = 404;
      throw error;
    }

    if (!user.emailconfirmed) {
      const error = new Error("Please confirm your email first");
      error.statusCode = 422;
      throw error;
    }

    if (user.role !== "admin") {
      const error = new Error("You are not authorized");
      error.statusCode = 400;
      throw error;
    }

    const isPassCorrect = await user.isPasswordMatch(password);
    if (!isPassCorrect) {
      const error = new Error("Incorrect password");
      error.statusCode = 403;
      throw error;
    }
    // Generate user token
    const userToken = generateToken(user._id);
    // Generate refresh token
    const refreshToken = generateRefreshToken(user._id);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 72 * 60 * 60 * 1000,
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });
    await User.findByIdAndUpdate(user._id, { refreshToken });
    const {
      password: a,
      refreshToken: b,
      isBlocked,
      role,
      ...other
    } = user._doc;

    res.status(200).json({ ...other, token: userToken });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
// user logout
exports.userLogOut = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      const error = new Error("No refresh token in cookies");
      error.statusCode = 404;
      throw error;
    }
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.SECRET_TOKEN,
      {},
      (err, decodedToken) => {
        if (err) {
          res.clearCookie("refreshToken", {
            secure: true,
            httpOnly: false,
            sameSite: "None",
          });
          const error = new Error(err.message);
          error.stack = err.stack;
          error.statusCode = 417;
          throw error;
        }
        return decodedToken;
      }
    );
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
      const error = new Error("Forbidden");
      error.statusCode = 417;
      throw error;
    }
    res.clearCookie("refreshToken", {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// admin logout
exports.logOut = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      const error = new Error("No refresh token in cookies");
      error.statusCode = 417;
      throw error;
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
      const error = new Error("Forbidden");
      error.statusCode = 417;
      throw error;
    }
    user.refreshToken = "";
    await user.save();
    res.clearCookie("refreshToken", {
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });
    res.sendStatus(204);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Forgot passowrd
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("هذا الحساب غير موجود");
      error.statusCode = 404;
      throw error;
    }

    const token = await user.createResetPassToken();
    await user.save();
    const resetUrl = `
    <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_3113153394752713280mdv2rw">
      <img 
        style="object-fit:cover"
        src="https://www.csc.gov.sg/images/default-source/ethos-images/ethos-digital-edition-(aug-2021)/role-of-govt-in-ecommerce_banner-teaser.jpg" 
        width="120" 
        height="80" 
        aria-hidden="true" 
        style="margin-bottom:16px" 
        alt="E-commerce" 
        class="CToWUd" 
        data-bit="iit">
      <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
        <div style="font-size:24px">
          Reset your password
        </div>
        <a style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${user.email}</a>
      </div>
      <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">
        Just click the button below to return your account
        <div style="padding-top:32px;text-align:center">
          <a href="${process.env.CLIENT_URL}/auth/reset-password/${token}/" style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:16px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline-block;padding:10px 24px;background-color: #003e29;border-radius:5px;min-width:90px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Dmohammedbelal802@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1602519112000?rfn%253D31%2526rfnc%253D1%2526eid%253D7075151940979537584%2526et%253D0%2526anexp%253D-control&amp;source=gmail&amp;ust=1680450201522000&amp;usg=AOvVaw2lPxF5ZwXRffazLR8nc5Fd">Reset</a>
        </div>
        <p>if button doesn't work for any reason, you cas also click on the link below:</p>
      <div>${process.env.CLIENT_URL}/auth/reset-password/${token}</div>
      </div>
    </div>
    `;
    const data = {
      to: email,
      text: `HI ${email}`,
      subject: "Forgot Password",
      html: resetUrl,
    };

    sendEmail(data);
    res.status(200).json({ message: "تفقد الايميل الخاص بك" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passowrdResetExpire: { $gt: Date.now() },
    });
    if (!user) {
      const error = new Error("انتهي الوقت المحدد");
      error.statusCode = 422;
      throw error;
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passowrdResetExpire = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.status(201).json({ message: "تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Handle refresh token for user
exports.handleRefreshTokenUser = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      const error = new Error("No Refresh Token In Cookies");
      error.statusCode = 417;
      throw error;
    }
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.SECRET_TOKEN,
      {},
      (err, decodedToken) => {
        if (err) {
          res.clearCookie("refreshToken", {
            secure: true,
            httpOnly: false,
            sameSite: "None",
          });
          const error = new Error(err.message);
          error.stack = err.stack;
          error.statusCode = 417;
          throw error;
        }
        return decodedToken;
      }
    );
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
      const error = new Error("There is no user with this refresh token in db");
      error.statusCode = 417;
      throw error;
    }

    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Handle refresh token form admin
exports.handleRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      const error = new Error("No Refresh Token In Cookies");
      error.statusCode = 417;
      throw error;
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
      const error = new Error("There is no user with this refresh token in db");
      error.statusCode = 417;
      throw error;
    }
    const decodedToken = jwt.verify(refreshToken, process.env.SECRET_TOKEN);
    if (!decodedToken || decodedToken.id !== user._id.toString()) {
      const error = new Error("There is something error with refresh token");
      error.statusCode = 417;
      throw error;
    }
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
