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
        console.log(error.response.headers)
        console.log(error.response.data)
      })
  },
    //empty array to only allow it to run once
    [])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        //functionality for determining spots available
        const daysArray = updateSpots();

        setState({
          ...state,
          appointments,
          days: daysArray
        })

      })
      .catch(e => console.log(e))

  }

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

    setState({
      ...state,
      appointments,
      days: daysArray
    });

    return axios.delete(`/api/appointments/${id}`)
  }
  //function for determining spots available
  const updateSpots = (type) => {

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

    console.log(`numOfSpots`, numOfSpots);

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