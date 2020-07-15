import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev=>({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      return all;
    })
  }, []);

  function bookInterview(id, interview, edit=false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //updating spots remaining
    const days = [...state.days]
    if (edit === false) {
      const todayIndex = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
      days[todayIndex] = {...state.days[todayIndex], spots: state.days[todayIndex].spots - 1 }
    }

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res=>{
      setState({
        ...state,
        appointments,
        days
      })
    })
  }

  function cancelInterview(id) {
    
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id],
      interview: null}
    };

    //updating spots remaining
    const todayIndex = state.days.filter(day => day.appointments.includes(id))[0]['id'] - 1
    const days = [...state.days]
    days[todayIndex] = {...state.days[todayIndex], spots: state.days[todayIndex].spots + 1 }


    return axios.delete(`/api/appointments/${id}`)
    .then(res=>{
      setState({
        ...state,
        appointments,
        days
      })
    })
  }

  const setDay = day => setState({...state, day});

  return { state, setDay, bookInterview, cancelInterview };
}