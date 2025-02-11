const user = require("../models/user");

exports.addUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new user({ name, email, age });
        await newUser.save();
        res.status(201).json({ message: "사용자 추가 성공", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};