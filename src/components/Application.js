import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from 'axios'

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

const [state, setState] = useState({
  day: 'Monday',
  days: [],
  interviewers: {},
  appointments: {}
})

const dailyAppointments = [];

const setDay = day => setState({ ...state, day });


useEffect(() => {
 const getDays =  axios.get('/api/days')
 const getAppt = axios.get('/api/appointments')
 const getInterviewer = axios.get('/api/interviewers')
 Promise.all([getDays, getAppt, getInterviewer])
  
  .then((all) => {
    setState(prev => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }))
  }).catch((error) => {
    console.log(error.response.status)
    console.log(error.response.headers)
    console.log(error.response.data)
  })
},
//empty array to only allow it to run once
[])



  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
