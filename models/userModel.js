import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plesae enter your name'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Plesae enter your email'],
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Plesae enter your password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, 'Plesae enter confirm your password'],
    validate: {
      //only works on create(), save()
      validator: function (val) {
        return val === this.password;
      },
      message: 'Please make sure your passwords match',
    },
  },
});

const User = mongoose.model('User', userSchema);
export default User;
