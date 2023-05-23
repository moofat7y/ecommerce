const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailconfirmed: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    image: {
      type: Object,
      secure_url: {
        type: String,
        default:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/120px-User-avatar.svg.png?20201213175635",
      },
      public_id: null,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    role: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passowrdResetExpire: Date,
    // expireAt: {
    //   type: Date,
    //   expires: "15m",
    //   default: null,
    // },
  },
  { timestamps: true }
);
// Hash user password before save it in db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add method to validate user password
userSchema.methods.isPasswordMatch = async function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
};

// Method to generate password reset token
userSchema.methods.createResetPassToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passowrdResetExpire = Date.now() + 1000 * 60 * 10; //Expire after 10 minutes
  return resetToken;
};
//Export the model

module.exports = mongoose.model("User", userSchema);
