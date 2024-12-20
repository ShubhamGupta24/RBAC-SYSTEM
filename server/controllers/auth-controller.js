const User = require("../models/user-register");



// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
    try {
        res.status(201).json({ msg: "Welcome to our home page" });
    } catch (error) {
        console.log(error);
    }
};

// *-------------------
// Registration Logic
// *-------------------

// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.
const register = async (req, res) => {
    try {
        const { username, email, phone, role, password, location } = req.body;
        console.log(req.body)

        // Checks the existence of user
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "email already exists" });
        }

        const userCreated = await User.create({ username, email, phone, role, password, location });

        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


// *-------------------
// Login Logic
// *-------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });


        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isValidPassword = await userExist.comparePassword(password);

        if (isValidPassword) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        } else {
            res.status(401).json({ message: "Invalid email or Password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

// *------------------------------------
//  User Data Passing to FrontEnd Logic
// *------------------------------------ 
const user = async (req, res) => {
    try {
        // const userData = await User.find({});
        const userData = req.user;
        console.log("user-controller",userData);
        // return res.status(200).json({ msg: "userData will be provided soon" });
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error}`);
    }
};
module.exports = { home, register, login, user };