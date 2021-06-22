import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

type UserRequestType = {
  name: string;
  email: string;
  admin?: boolean;
};

export class CreateUserService {
  async execute({ name, email, admin }: UserRequestType) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!name || !email) {
      throw new Error('Invalid informations.');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = usersRepository.create({ name, email, admin });
    await usersRepository.save(user);

    return user;
  }
}
