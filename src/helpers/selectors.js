// const appt = [state.appointments.appt]

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

export function getInterview(state, interview) {
  const interviewObj = {};

  if (!interview) {
    return null;
  }

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  interviewObj.student = interview.student;

  return interviewObj;
}

export function getInterviewersForDay(state, day) {

  const filteredInterviewers = [];
  // var result = Object.keys(filteredInterviewers).map((key) => [Number(key), filteredInterviewers[key]]);

  const matchedDay = state.days.filter(dayOb => dayOb.name === day)[0];

  if (!matchedDay) {
    return filteredInterviewers;
  };
  matchedDay.interviewers.forEach(viewer => {
    if (state.interviewers[viewer]) {
      filteredInterviewers.push(state.interviewers[viewer]);
    }
  })
  console.log(typeof (filteredInterviewers));
  return filteredInterviewers;
}