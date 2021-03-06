import { getCustomRepository } from 'typeorm';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';

export class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: { user_receiver_id: user_id },
      relations: ['userSender', 'userReceiver', 'tag'],
    });
    return compliments;
  }
}
