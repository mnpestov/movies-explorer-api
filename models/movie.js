const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле director должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле year должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле description должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле image должно быть заполнено'],
    validate: {
      validator(image) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(image);
      },
      message: 'Не верный формат URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink должно быть заполнено'],
    validate: {
      validator(trailerLink) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(trailerLink);
      },
      message: 'Не верный формат URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail должно быть заполнено'],
    validate: {
      validator(thumbnail) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(thumbnail);
      },
      message: 'Не верный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner должно быть заполнено'],
  },
  movieId: {
    type: Number,
    ref: 'movie',
    required: [true, 'Поле movieId должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN должно быть заполнено'],
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
