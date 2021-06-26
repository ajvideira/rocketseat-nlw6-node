import { getCustomRepository } from 'typeorm';

import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { TagsRepository } from '../repositories/TagsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

type ComplimentRequest = {
  tag_id: string;
  user_sender_id: string;
  user_receiver_id: string;
  message: string;
};

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender_id,
    user_receiver_id,
    message,
  }: ComplimentRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const tagsRepository = getCustomRepository(TagsRepository);
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    if (user_sender_id === user_receiver_id) {
      throw new Error('User cannot send compliment to himself.');
    }

    const userSenderExists = await usersRepository.findOne(user_sender_id);
    if (!userSenderExists) {
      throw new Error('User sender does not exist.');
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver_id);
    if (!userReceiverExists) {
      throw new Error('User receiver does not exist.');
    }

    const tagExists = await tagsRepository.findOne(tag_id);
    if (!tagExists) {
      throw new Error('Tag does not exist.');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender_id,
      user_receiver_id,
      message,
    });
    await complimentsRepository.save(compliment);

    return compliment;
  }
}
