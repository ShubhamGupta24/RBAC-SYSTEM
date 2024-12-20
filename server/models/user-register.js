const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Define the User Resgister schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
});

// During Password Hashing:  
// The pre middleware is defined within the userSchema before creating the User model.
// This ensures that the middleware is properly applied to user documents before they are saved to the database.
userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified) {
    return next();
  }

  try {
    //? secure the password with the bcrypt
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});




//? Generate JSON Web Token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "60d",
      }
    );

  } catch (error) {
    console.error("Token Error: ", error);
  }
};


// instance method to compare hashed password and entered password

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

// define the model or the collection name
const User = new mongoose.model("USER", userSchema);
module.exports = User