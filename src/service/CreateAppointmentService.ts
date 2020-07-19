import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
// import { uuid } from 'uuidv4';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
    //   appointmentDate,
    // );

    if (findAppointmentInSameDate) {
      throw new Error('this date is already booked');
    }

    const appointment = appointmentsRepository.create({
      // id: uuid(),
      provider,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
