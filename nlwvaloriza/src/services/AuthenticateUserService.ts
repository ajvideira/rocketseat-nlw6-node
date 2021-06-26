import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { sign } from 'jsonwebtoken';

type AuthenticateRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }
    console.log('chegou aqui');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign(
      {
        email: user.email,
      },
      '71137569747e21ffc3c820f3a705fcb7',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}
