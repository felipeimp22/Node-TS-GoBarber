// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';
// Data Transfer Object
// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      // where: { date: date },
      where: { date },
    });
    return findAppointment || null;
  }
}
export default AppointmentsRepository;
