import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class ChangeProviderToProviderId1596301695532
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        // onUpdate: 'CASCADE', <--- se o usuario atualizar o id, ele entra em cascata, Reflete em seus relacionamentos
        // e todos os seus relacionamentos altera seu id tbm.
        // nesse caso é o id, pois esta na referencedColumnNames

        // onDelete: 'CASCADE', <--apos a deleção, ira deletar todos agendamentos que ele esta relacionado
        // onDelete: 'SET Null',  <--- seta como null
        // onDelete: 'RESTRICT' <---- não deixa o usuario ser deletado
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Para essa etapa, é preciso deletar tudo em ordem de final até o começo, ou seja
    // começar deletando oque foi criado por ultimo, assim em diante
    // e alem de deletar ele precisa refazer oque foi feito, se nesse caso criamos o provider_id e tiramos o provider
    // entao devemos retornar o provider
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
