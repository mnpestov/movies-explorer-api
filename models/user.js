const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Укажите почту в формате user@domain.tld',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длинна 2 символа'],
    maxlength: [30, 'Максимальная длинна 30 символов'],
  },
});

exports.User = mongoose.model('user', userSchema);
