import React, { useState, useEffect } from "react";
import axios from 'axios';


import "components/Application.scss";
import 'components/Appointment';
import DayList from './DayList';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors'; 

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day})
  
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev=>({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      return all;
    })
    // .then((all) => console.log(all))

  }, []);

  
  const appointments = getAppointmentsForDay(state, state.day);


  const schedule = appointments.map(appointment=>{
    appointment.interview = getInterview(state, appointment.interview)
    appointment.interviewers = getInterviewersForDay(state, state.day);
    console.log(appointment.interviewers);
    return (
    <Appointment
    key={appointment.id}
    {...appointment}/
    >)
  });
  
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
            day={state.day}
            setDay={day => setDay(day)} />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}