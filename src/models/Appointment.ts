// import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // se nao passar nada no () o tipo é varchar
  provider: string;

  @Column('timestamp with local time zone')
  date: Date;

  // Omit é um Helper que passa como primeiro parametro a tipagem que voce vai usar,
  //  e como segundo parametro a ainformação que você vai retirar de dentro da tipagem
  // ou seja qual informação nao vai ser esperada na tipagem

  // aqui no caso foi usado o proprio Appointment que tem o id,provider e date e o id é retirado
  // para que o constructor nao espere receber o id

  /**
   *
   * Se o model for usado com TypeORM ou algo do tipo, o constructor nao é mais necessario pois ele já
   * cria automaticamente por baixo dos panos
   */
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
