import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <section>
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition("CREATE")} />}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer} />
    )}
    {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onSave={(interviewer, name)=>console.log(interviewer, name)}
      onCancel={()=>back()}/>
    )}
  </section>
  )
}

// appointment.interviewers = getInterviewersForDay(state, state.day);
// console.log(appointment.interviewers);
