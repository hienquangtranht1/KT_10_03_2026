var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// Khai báo Router
var rolesRouter = require('./routes/roles');
var usersRouter = require('./routes/users');

// 1. KHỞI TẠO APP EXPRESS TRƯỚC
var app = express(); 

// 2. KẾT NỐI MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/TestDB')
  .then(() => console.log('✅ Kết nối MongoDB thành công!'))
  .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

// 3. CẤU HÌNH APP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // Phải có cái này để đọc được file JSON gửi lên
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. GẮN ROUTER (Bắt buộc phải nằm sau cấu hình express.json)
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);

module.exports = app;