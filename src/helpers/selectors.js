export function getAppointmentsForDay(state, day) {
  
  const appointmentFilter = [];

  const dayMatch = state.days.filter(dayObj => dayObj.name === day)[0];
  
  if (!dayMatch) {
    return appointmentFilter;
  }
  
  dayMatch.appointments.forEach(appt => {
    if (state.appointments[appt]) {
      appointmentFilter.push(state.appointments[appt]);
    }
  })

  return appointmentFilter;
}