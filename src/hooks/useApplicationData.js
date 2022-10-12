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

        console.log('axios put response', res);
        setState({
          ...state,
          appointments
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

    setState({
      ...state,
      appointments
    });

    return axios.delete(`/api/appointments/${id}`)
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

} 