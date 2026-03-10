const express = require('express');
const router = express.Router();
const Role = require('../schemas/role');
const User = require('../schemas/user');

// C (Create): Tạo Role mới
router.post('/', async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// R (Read all)
router.get('/', async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });
        res.status(200).json(roles);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// R (Read by ID)
router.get('/:id', async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
        res.status(200).json(role);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// U (Update)
router.put('/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(role);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// D (Xóa mềm)
router.delete('/:id', async (req, res) => {
    try {
        await Role.findByIdAndUpdate(req.params.id, { isDeleted: true });
        res.status(200).json({ message: "Đã xóa mềm Role" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// YÊU CẦU 4: Lấy tất cả user có role là id
router.get('/:id/users', async (req, res) => {
    try {
        const users = await User.find({ role: req.params.id, isDeleted: false }).populate('role');
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;