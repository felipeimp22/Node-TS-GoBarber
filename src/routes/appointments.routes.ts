import { Router } from 'express';
//--------------------------------------------------------------------------
// coment 1
// import { uuid } from 'uuidv4';
//--------------------------------------------------------------------------

import { startOfHour, parseISO, isEqual } from 'date-fns';
// import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
//--------------------------------------------------------------------------
// coment 1
// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }
//--------------------------------------------------------------------------
// coment 2
// const appointments: Appointment[] = [];

const appointmentsRepository = new AppointmentsRepository();
appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  //--------------------------------------------------------------------------
  // coment 2
  // const findAppointmentInSameDate = appointments.find(appointment =>
  //   isEqual(parsedDate, appointment.date),
  // );
  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );
  if (findAppointmentInSameDate) {
    return res.status(400).json({ error: 'this date is already booked' });
  }
  //--------------------------------------------------------------------------
  // coment 1
  // const appointment = {
  //   id: uuid(),
  //   provider,
  //   date: parsedDate,
  // };
  //--------------------------------------------------------------------------
  // coment 2
  // const appointment = new Appointment(provider, parsedDate);
  // appointments.push(appointment);

  const appointment = appointmentsRepository.create(provider, parsedDate);
  return res.json(appointment);
});

export default appointmentsRouter;
