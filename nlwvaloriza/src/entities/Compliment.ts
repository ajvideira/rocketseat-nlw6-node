import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Tag } from './Tag';
import { User } from './User';

@Entity('compliments')
export class Compliment {
  @PrimaryColumn()
  id: string;

  @Column()
  user_sender_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_sender_id' })
  userSenderr: User;

  @Column()
  user_receiver_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_receiver_id' })
  userReceiver: User;

  @Column()
  tag_id: string;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
