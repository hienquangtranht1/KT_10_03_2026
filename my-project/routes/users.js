const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

// YÊU CẦU 2: POST /enable
router.post('/enable', async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: true },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "Sai thông tin" });
        res.status(200).json({ message: "Đã bật status (true)", user });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// YÊU CẦU 3: POST /disable
router.post('/disable', async (req, res) => {
    try {
        const { email, username } = req.body;
        const user = await User.findOneAndUpdate(
            { email, username, isDeleted: false },
            { status: false },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: "Sai thông tin" });
        res.status(200).json({ message: "Đã tắt status (false)", user });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// C (Create User)
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// YÊU CẦU 1: R (Read all + Query Username)
router.get('/', async (req, res) => {
    try {
        let query = { isDeleted: false };
        if (req.query.username) {
            query.username = { $regex: req.query.username, $options: 'i' }; 
        }
        const users = await User.find(query).populate('role');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// R (Read by ID)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        res.status(200).json(user);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// U (Update)
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// D (Xóa mềm)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.status(200).json({ message: "Đã xóa mềm User" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;