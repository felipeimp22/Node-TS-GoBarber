import { Router, response } from 'express';
//--------------------------------------------------------------------------
// coment 1
// import { uuid } from 'uuidv4';
//--------------------------------------------------------------------------

import { startOfHour, parseISO, isEqual } from 'date-fns';
// import Appointment from '../models/Appointment';

import CreateAppointmentService from '../service/CreateAppointmentService';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
//
//
//
//
//
//
//
//
//
//
// import { Router } from 'express';
// //--------------------------------------------------------------------------
// // coment 1
// // import { uuid } from 'uuidv4';
// //--------------------------------------------------------------------------

// import { startOfHour, parseISO, isEqual } from 'date-fns';
// // import Appointment from '../models/Appointment';

// import CreateAppointmentService from '../service/CreateAppointmentService';

// import AppointmentsRepository from '../repositories/AppointmentsRepository';

// const appointmentsRouter = Router();
// //--------------------------------------------------------------------------
// // coment 1
// // interface Appointment {
// //   id: string;
// //   provider: string;
// //   date: Date;
// // }
// //--------------------------------------------------------------------------
// // coment 2
// // const appointments: Appointment[] = [];

// const appointmentsRepository = new AppointmentsRepository();
// appointmentsRouter.post('/', (req, res) => {
//   const { provider, date } = req.body;

//   const parsedDate = parseISO(date);
//   //--------------------------------------------------------------------------
//   // Coment 3
//   // const appointmentDate = startOfHour(parsedDate);

//   //--------------------------------------------------------------------------
//   // coment 3

//   // const parsedDate = startOfHour(parseISO(date));
//   //--------------------------------------------------------------------------
//   // coment 2
//   // const findAppointmentInSameDate = appointments.find(appointment =>
//   //   isEqual(parsedDate, appointment.date),
//   // );
//   //--------------------------------------------------------------------------
//   // Coment 3
//   // const findAppointmentInSameDate = appointmentsRepository.findByDate(
//   //   parsedDate,
//   // );
//   // if (findAppointmentInSameDate) {
//   //   return res.status(400).json({ error: 'this date is already booked' });
//   // }
//   //--------------------------------------------------------------------------
//   // coment 1
//   // const appointment = {
//   //   id: uuid(),
//   //   provider,
//   //   date: parsedDate,
//   // };
//   //--------------------------------------------------------------------------
//   // coment 2
//   // const appointment = new Appointment(provider, parsedDate);
//   // appointments.push(appointment);
//   //--------------------------------------------------------------------------
//   // Coment 3

//   // const appointment = appointmentsRepository.create({
//   //   provider,
//   //   date: appointmentDate,
//   // });
//   const createAppointment = new CreateAppointmentService(
//     appointmentsRepository,
//   );
//   const appointment = createAppointment.execute({ date: parsedDate, provider });
//   return res.json(appointment);
// });

// export default appointmentsRouter;
