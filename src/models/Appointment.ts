// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // se nao passar nada no () o tipo é varchar
  provider_id: string;

  // SQL:
  // relacionamentos:
  // OneToOne  <-- um para um, no maximo um
  // OneToMany <-- um para muitos
  // ManyToMany <--relacionamentos multiplos de ambas as partes
  // CRIANDO RELACIONAMENTO NO MODEL
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' }) // esse campo, fala qual coluna vai identificar qual usuario pertense a esse relacionamento
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
