import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from 'axios'

export default function Application(props) {

// const [days, setDays] = useState([]);

// const [day, setDay] = useState("Monday")

const [state, setState] = useState({
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {}
})

const setDay = day => setState({ ...state, day });


useEffect(() => {
  axios.get('/api/days')
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


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


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
        {Object.values(appointments).map(appointment => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
