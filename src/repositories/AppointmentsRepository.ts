import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null; // retorna a const findAppointment ou retorna null ao inves de undefined
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }

  // public create(data: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment(data.provider, data.date);
  //   this.appointments.push(appointment);
  //   return appointment;
  // }
}
export default AppointmentsRepository;
