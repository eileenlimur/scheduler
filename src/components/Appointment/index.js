import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then((res)=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE, true))
  }

  function deleteInterview() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(()=>transition(EMPTY))
      .catch(()=>transition(ERROR_DELETE, true))
  }

  return (
  <section>
    <Header time = {props.time}/>
    {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
        onEdit={()=>transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
    )}
    {mode === EDIT && (
      <Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        name={props.interview.student}
        onSave={save}
        onCancel={back}
      />
    )}
    {mode === SAVING && (
      <Status message='Saving'/>
    )}
    {mode === DELETING && (
      <Status message='Deleting'/>
    )}
    {mode === CONFIRM && (
      <Confirm
        message='Are you sure you want to delete?'
        onConfirm={deleteInterview}
        onCancel={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Error when deleting"
        onClose={back}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message="Error when saving"
        onCancel={back}
      />
    )}
  </section>
  )
}

// appointment.interviewers = getInterviewersForDay(state, state.day);
// console.log(appointment.interviewers);
