import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 3,
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'Nome de usuário é obrigatório'],
    minLength: 3,
  },
  passwordHash: {
    type: String,
    trim: true,
    required: [true, 'Senha é obrigatório'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email é obrigatório'],
    validate: {
      validator: (v: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: 'o email informado não é válido!',
    },
  },
  role: {
    type: String,
    trim: true,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const User = model('User', userSchema);
