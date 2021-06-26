import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompliments1624670757430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compliments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_sender_id',
            type: 'uuid',
          },
          {
            name: 'user_receiver_id',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_compliment_user_sender',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_sender_id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_compliment_user_receiver',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_receiver_id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            name: 'fk_compliment_tag',
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tag_id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }
}
