import { useEffect, useState } from 'react';
import axios from 'axios';


export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const getDays = axios.get('/api/days')
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
      })
  },
    //empty array to only allow it to run once
    [])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        if (!state.appointments[id].interview) {
          return { ...day, spots: day.spots - 1 }
        }
      }
      return day;
    })


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {

        setState({
          ...state,
          appointments,
          // days: daysArray
          days
        })
      })
      //rejects the save function promise
      .catch(e => Promise.reject(e))

  }

  //function for canceling the interview

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //functionality for determining spots available
    const daysArray = updateSpots('delete');


    return axios.delete(`/api/appointments/${id}`)

      .then(() => {
        setState({
          ...state,
          appointments,
          days: daysArray
        });
      })
      .catch(e => Promise.reject(e))

  }
  //function for determining spots available
  const updateSpots = (type, update) => {

    let dayId = 0;
    if (state.day === 'Monday') {
      dayId = 0;
    } else if (state.day === 'Tuesday') {
      dayId = 1;
    } else if (state.day === 'Wednesday') {
      dayId = 2;
    } else if (state.day === 'Thursday') {
      dayId = 3;
    } else if (state.day === 'Friday') {
      dayId = 4;
    }

    let numOfSpots = -1;

    for (const apt of state.days[dayId].appointments) {
      if (!state.appointments[apt].interview) {
        numOfSpots++;
      }
    }

    if (type === 'delete') {
      numOfSpots += 2;
    }


    const daysArray = [...state.days];
    daysArray[dayId].spots = numOfSpots;

    return daysArray;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

} 