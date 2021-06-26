import { getCustomRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import { UsersRepository } from '../repositories/UsersRepository';

type UserRequestType = {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
};

export class CreateUserService {
  async execute({ name, email, admin = false, password }: UserRequestType) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!name || !email) {
      throw new Error('Invalid informations.');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await usersRepository.save(user);

    return user;
  }
}
