import userDb from "../models/userSchema.js";
 export const validateUser = async(req, res, next) => {
    const { name, email, password } = req.body;
const gmailRegex = /^[a-z0-9]+@gmail\.com$/;
    if (!name || !email || !password) {
        return res.status(400).json({ "message": "Please enter all the data" });
    }

    if (!gmailRegex.test(email)) {
        return res.status(400).json({ "message": "Invalid email format" });
     }
    const existUser = await userDb.findOne({ email });
        if (existUser) {
            return res.status(401).json({ "message": "User already exists in this mail" })
        }

    next();
};
